import "server-only";

import { sql, sqlTransaction } from "@/lib/neon";
import { authGuard } from "@/lib/auth-utils";
import { userTag, withFallback } from "@/utils/cache";
import { RuleViolationError } from "@/utils/error";
import { readableCurrency } from "@/utils/currency";
import { formatCalendarDay } from "@/utils/date";
import type {
  Loan,
  LoanInput,
  LoanInputWithId,
  LoanPayment,
  LoanPaymentInputWithId,
  LoanPaymentInputWithLoanId,
} from "@/types/loans";
import { cacheLife, cacheTag, updateTag } from "next/cache";

type NumericString = string;
type Nullable<T> = { [K in keyof T]: T[K] | null };

interface LoanRow {
  id: number;
  lender: string;
  amount: number;
  currency: string;
  start_date: string;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  paid_amount: NumericString | number;
  first_payment_date: string | null;
  last_payment_date: string | null;
}

type LoanPaymentStats = Pick<
  LoanRow,
  "paid_amount" | "first_payment_date" | "last_payment_date"
>;

interface LoanPaymentRow {
  id: number;
  loan_id: number;
  amount: number;
  date: string;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

// The loan a payment is validated against. It is read by the same statement
// that writes the payment, so the payment row is null when a rule is broken.
interface PaymentTargetRow {
  remaining_amount: NumericString;
  currency: string;
  start_date: string;
}

export const createLoan = authGuard(
  (session) =>
    async (loan: LoanInput): Promise<Loan> => {
      const result = await sql<LoanRow>`
        INSERT INTO loan (
          lender,
          amount,
          currency,
          start_date,
          notes,
          user_id
        ) VALUES (
          ${loan.lender},
          ${loan.amount},
          ${loan.currency.code},
          ${loan.startDate},
          ${loan.notes || null},
          ${session.user.id}
        )
        RETURNING
          id,
          lender,
          amount,
          currency,
          to_char(start_date, 'YYYY-MM-DD') AS start_date,
          notes,
          created_at,
          updated_at,
          0 AS paid_amount,
          NULL AS first_payment_date,
          NULL AS last_payment_date
      `;

      const created = result[0];

      if (!created) throw new Error("Failed to create loan");

      invalidateLoanTags(session.user.id, created.id);

      return loanFromDb(created);
    },
);

export const getLoanById = authGuard(
  (session) =>
    async (id: number): Promise<Loan | null> => {
      "use cache";
      cacheLife("max");
      cacheTag(userTag(session.user.id)(`loans/id/${id}`));

      const result = await sql<LoanRow>`
        SELECT
          l.id,
          l.lender,
          l.amount,
          l.currency,
          to_char(l.start_date, 'YYYY-MM-DD') AS start_date,
          l.notes,
          l.created_at,
          l.updated_at,
          COALESCE(SUM(p.amount), 0) AS paid_amount,
          to_char(MIN(p.date), 'YYYY-MM-DD') AS first_payment_date,
          to_char(MAX(p.date), 'YYYY-MM-DD') AS last_payment_date
        FROM loan l
        LEFT JOIN loan_payment p ON p.loan_id = l.id
        WHERE l.id = ${id}
          AND l.user_id = ${session.user.id}
        GROUP BY l.id
      `;

      const row = result[0];
      if (!row) return null;

      return loanFromDb(row);
    },
);

export const getAllLoans = authGuard((session) =>
  withFallback([], async (): Promise<Loan[]> => {
    "use cache";
    cacheLife("max");
    cacheTag(userTag(session.user.id)("loans/list"));

    const result = await sql<LoanRow>`
      SELECT
        l.id,
        l.lender,
        l.amount,
        l.currency,
        to_char(l.start_date, 'YYYY-MM-DD') AS start_date,
        l.notes,
        l.created_at,
        l.updated_at,
        COALESCE(SUM(p.amount), 0) AS paid_amount,
        to_char(MIN(p.date), 'YYYY-MM-DD') AS first_payment_date,
        to_char(MAX(p.date), 'YYYY-MM-DD') AS last_payment_date
      FROM loan l
      LEFT JOIN loan_payment p ON p.loan_id = l.id
      WHERE l.user_id = ${session.user.id}
      GROUP BY l.id
      ORDER BY
        COALESCE(SUM(p.amount), 0) >= l.amount ASC,
        l.start_date DESC,
        l.id DESC
    `;

    return result.map(loanFromDb);
  }),
);

export const updateLoan = authGuard(
  (session) =>
    async (loan: LoanInputWithId): Promise<Loan> => {
      const result = await sqlTransaction([
        lockLoan(loan.id, session.user.id),
        sql<LoanPaymentStats & Nullable<Omit<LoanRow, keyof LoanPaymentStats>>>`
        WITH target AS (
          SELECT
            l.id,
            COALESCE(SUM(p.amount), 0) AS paid_amount,
            MIN(p.date) AS first_payment_date,
            MAX(p.date) AS last_payment_date
          FROM loan l
          LEFT JOIN loan_payment p ON p.loan_id = l.id
          WHERE l.id = ${loan.id}
            AND l.user_id = ${session.user.id}
          GROUP BY l.id
        ),
        updated AS (
          UPDATE loan l
          SET
            lender = ${loan.lender},
            amount = ${loan.amount},
            currency = ${loan.currency.code},
            start_date = ${loan.startDate},
            notes = ${loan.notes || null},
            updated_at = NOW()
          FROM target t
          WHERE l.id = t.id
            AND t.paid_amount <= ${loan.amount}
            AND (
              t.first_payment_date IS NULL
              OR t.first_payment_date >= ${loan.startDate}::date
            )
          RETURNING
            l.id,
            l.lender,
            l.amount,
            l.currency,
            to_char(l.start_date, 'YYYY-MM-DD') AS start_date,
            l.notes,
            l.created_at,
            l.updated_at
        )
        SELECT
          u.id,
          u.lender,
          u.amount,
          u.currency,
          u.start_date,
          u.notes,
          u.created_at,
          u.updated_at,
          t.paid_amount,
          to_char(t.first_payment_date, 'YYYY-MM-DD') AS first_payment_date,
          to_char(t.last_payment_date, 'YYYY-MM-DD') AS last_payment_date
        FROM target t
        LEFT JOIN updated u ON u.id = t.id
      `,
      ]);

      const row = result[0];

      if (!row) throw new Error("Loan not found");

      if (row.id === null) {
        const paidAmount = Number(row.paid_amount);
        if (loan.amount < paidAmount) {
          throw new RuleViolationError(
            `The amount can't be less than the ${readableCurrency(paidAmount)} ${loan.currency.code} already paid`,
          );
        }
        throw new RuleViolationError(
          `The start date can't be after the first payment (${formatCalendarDay(row.first_payment_date!)})`,
        );
      }

      invalidateLoanTags(session.user.id, loan.id);

      return loanFromDb(row as LoanRow);
    },
);

export const deleteLoan = authGuard((session) => async (loanId: number) => {
  const result = await sql<Pick<LoanRow, "id">>`
    DELETE FROM loan
    WHERE id = ${loanId} AND user_id = ${session.user.id}
    RETURNING id
  `;

  if (!result[0]) throw new Error("Loan not found or delete failed");

  invalidateLoanTags(session.user.id, loanId);
});

function loanFromDb(dbResult: LoanRow): Loan {
  const paidAmount = Number(dbResult.paid_amount);
  const isPaidOff = paidAmount >= dbResult.amount;

  return {
    id: dbResult.id,
    lender: dbResult.lender,
    amount: dbResult.amount,
    paidAmount,
    remainingAmount: Math.max(dbResult.amount - paidAmount, 0),
    currency: dbResult.currency,
    startDate: new Date(dbResult.start_date),
    isPaidOff,
    paidOffDate:
      isPaidOff && dbResult.last_payment_date
        ? new Date(dbResult.last_payment_date)
        : undefined,
    firstPaymentDate: dbResult.first_payment_date
      ? new Date(dbResult.first_payment_date)
      : undefined,
    notes: dbResult.notes ?? undefined,
    createdAt: new Date(dbResult.created_at),
    updatedAt: new Date(dbResult.updated_at),
  };
}

export const createLoanPayment = authGuard(
  (session) =>
    async (payment: LoanPaymentInputWithLoanId): Promise<LoanPayment> => {
      const result = await sqlTransaction([
        lockLoan(payment.loanId, session.user.id),
        sql<PaymentTargetRow & Nullable<LoanPaymentRow>>`
        WITH target AS (
          SELECT
            l.id,
            l.currency,
            l.start_date,
            l.amount - COALESCE(SUM(p.amount), 0) AS remaining_amount
          FROM loan l
          LEFT JOIN loan_payment p ON p.loan_id = l.id
          WHERE l.id = ${payment.loanId}
            AND l.user_id = ${session.user.id}
          GROUP BY l.id
        ),
        inserted AS (
          INSERT INTO loan_payment (
            loan_id,
            amount,
            date,
            notes
          )
          SELECT
            t.id,
            ${payment.amount},
            ${payment.date},
            ${payment.notes || null}
          FROM target t
          WHERE t.remaining_amount >= ${payment.amount}
            AND t.start_date <= ${payment.date}::date
          RETURNING
            id,
            loan_id,
            amount,
            to_char(date, 'YYYY-MM-DD') AS date,
            notes,
            created_at,
            updated_at
        )
        SELECT
          t.remaining_amount,
          t.currency,
          to_char(t.start_date, 'YYYY-MM-DD') AS start_date,
          i.id,
          i.loan_id,
          i.amount,
          i.date,
          i.notes,
          i.created_at,
          i.updated_at
        FROM target t
        LEFT JOIN inserted i ON i.loan_id = t.id
      `,
      ]);

      const row = result[0];

      if (!row) throw new Error("Loan not found");
      if (row.id === null) throwPaymentRuleViolation(row, payment.amount);

      invalidateLoanTags(session.user.id, payment.loanId);

      return loanPaymentFromDb(row as LoanPaymentRow);
    },
);

export const getLoanPaymentsByLoanId = authGuard((session) =>
  withFallback([], async (loanId: number): Promise<LoanPayment[]> => {
    "use cache";
    cacheLife("max");
    cacheTag(userTag(session.user.id)(`loan-payments/loan/${loanId}`));

    const result = await sql<LoanPaymentRow>`
      SELECT
        p.id,
        p.loan_id,
        p.amount,
        to_char(p.date, 'YYYY-MM-DD') AS date,
        p.notes,
        p.created_at,
        p.updated_at
      FROM loan_payment p
      INNER JOIN loan l ON l.id = p.loan_id
      WHERE p.loan_id = ${loanId}
        AND l.user_id = ${session.user.id}
      ORDER BY p.date DESC, p.id DESC
    `;

    return result.map(loanPaymentFromDb);
  }),
);

export const updateLoanPayment = authGuard(
  (session) =>
    async (payment: LoanPaymentInputWithId): Promise<LoanPayment> => {
      const result = await sqlTransaction([
        lockLoan(payment.loanId, session.user.id),
        sql<PaymentTargetRow & Nullable<LoanPaymentRow>>`
        WITH target AS (
          SELECT
            p.id,
            l.currency,
            l.start_date,
            l.amount - COALESCE((
              SELECT SUM(other.amount)
              FROM loan_payment other
              WHERE other.loan_id = l.id
                AND other.id <> p.id
            ), 0) AS remaining_amount
          FROM loan_payment p
          INNER JOIN loan l ON l.id = p.loan_id
          WHERE p.id = ${payment.id}
            AND p.loan_id = ${payment.loanId}
            AND l.user_id = ${session.user.id}
        ),
        updated AS (
          UPDATE loan_payment p
          SET
            amount = ${payment.amount},
            date = ${payment.date},
            notes = ${payment.notes || null},
            updated_at = NOW()
          FROM target t
          WHERE p.id = t.id
            AND t.remaining_amount >= ${payment.amount}
            AND t.start_date <= ${payment.date}::date
          RETURNING
            p.id,
            p.loan_id,
            p.amount,
            to_char(p.date, 'YYYY-MM-DD') AS date,
            p.notes,
            p.created_at,
            p.updated_at
        )
        SELECT
          t.remaining_amount,
          t.currency,
          to_char(t.start_date, 'YYYY-MM-DD') AS start_date,
          u.id,
          u.loan_id,
          u.amount,
          u.date,
          u.notes,
          u.created_at,
          u.updated_at
        FROM target t
        LEFT JOIN updated u ON u.id = t.id
      `,
      ]);

      const row = result[0];

      if (!row) throw new Error("Loan payment not found");
      if (row.id === null) throwPaymentRuleViolation(row, payment.amount);

      invalidateLoanTags(session.user.id, payment.loanId);

      return loanPaymentFromDb(row as LoanPaymentRow);
    },
);

export const deleteLoanPayment = authGuard(
  (session) =>
    async (paymentId: number): Promise<void> => {
      const result = await sql<Pick<LoanPaymentRow, "loan_id">>`
        DELETE FROM loan_payment p
        USING loan l
        WHERE p.id = ${paymentId}
          AND p.loan_id = l.id
          AND l.user_id = ${session.user.id}
        RETURNING p.loan_id
      `;

      const deleted = result[0];
      if (!deleted) throw new Error("Loan payment not found or delete failed");

      invalidateLoanTags(session.user.id, deleted.loan_id);
    },
);

function throwPaymentRuleViolation(
  target: PaymentTargetRow,
  amount: number,
): never {
  const remainingAmount = Number(target.remaining_amount);

  if (amount > remainingAmount) {
    throw new RuleViolationError(
      remainingAmount > 0
        ? `The payment can't exceed the ${readableCurrency(remainingAmount)} ${target.currency} left to pay`
        : "This loan is already paid off",
    );
  }

  throw new RuleViolationError(
    `The payment date can't be before the loan start date (${formatCalendarDay(target.start_date)})`,
  );
}

function loanPaymentFromDb(dbResult: LoanPaymentRow): LoanPayment {
  return {
    id: dbResult.id,
    loanId: dbResult.loan_id,
    amount: dbResult.amount,
    date: new Date(dbResult.date),
    notes: dbResult.notes ?? undefined,
    createdAt: new Date(dbResult.created_at),
    updatedAt: new Date(dbResult.updated_at),
  };
}

// Writes that check a loan's rules lock it first, so concurrent writes to the
// same loan (e.g. from two devices) run one at a time and each one checks the
// payments committed before it, instead of a stale snapshot.
function lockLoan(loanId: number, userId: string) {
  return sql`
    SELECT 1
    FROM loan
    WHERE id = ${loanId} AND user_id = ${userId}
    FOR UPDATE
  `;
}

function invalidateLoanTags(userId: string, loanId: number) {
  const tag = userTag(userId);
  updateTag(tag("loans"));
  updateTag(tag("loans/list"));
  updateTag(tag(`loans/id/${loanId}`));
  updateTag(tag(`loan-payments/loan/${loanId}`));
}
