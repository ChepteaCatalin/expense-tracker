import { amountValidation, validDate } from "@/utils/validation";
import z from "zod";
import type { CurrencyOption } from "@/types/currency";
import type {
  LoanFormValues,
  LoanInput,
  LoanPaymentFormValues,
  LoanPaymentInput,
} from "@/types/loans";
import { readableCurrency, toCents } from "@/utils/currency";
import { formatCalendarDay } from "@/utils/date";

const notesValidation = z.string().max(500, "Must be at most 500 characters");

// Date picker values are ISO strings in the user's time zone, so their first
// ten characters are the calendar day, which is also what the database stores.
function toDay(value: string) {
  return value.slice(0, 10);
}

function formatAmount(cents: number, currency?: string) {
  return [readableCurrency(cents), currency].filter(Boolean).join(" ");
}

/** The limits come from the loan's payments, so they only apply when editing. */
export function loanSchema({
  paidAmount,
  firstPaymentDay,
  currency,
}: {
  /** In cents */
  paidAmount?: number;
  /** `yyyy-MM-dd` */
  firstPaymentDay?: string;
  currency?: string;
} = {}) {
  return z
    .object({
      lender: z
        .string()
        .trim()
        .min(1, "Required field")
        .max(100, "Must be at most 100 characters"),
      amount: amountValidation,
      currency: z
        .custom<CurrencyOption | null>()
        .refine((v): v is CurrencyOption => !!v?.code, {
          message: "Required field",
        }),
      startDate: validDate,
      notes: notesValidation,
    })
    .superRefine(({ amount, startDate }, ctx) => {
      if (
        paidAmount !== undefined &&
        typeof amount === "number" &&
        toCents(amount) < paidAmount
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["amount"],
          message: `Can't be less than the ${formatAmount(paidAmount, currency)} already paid`,
        });
      }
      if (
        firstPaymentDay &&
        typeof startDate === "string" &&
        toDay(startDate) > firstPaymentDay
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["startDate"],
          message: `Can't be after the first payment (${formatCalendarDay(firstPaymentDay)})`,
        });
      }
    }) satisfies z.ZodType<LoanInput, LoanFormValues>;
}

/** The limits come from the loan, so they are only known on the client. */
export function loanPaymentSchema({
  maxAmount,
  minDay,
  currency,
}: {
  /** In cents: what is left to pay, including the payment being edited */
  maxAmount?: number;
  /** `yyyy-MM-dd`: the loan's start date */
  minDay?: string;
  currency?: string;
} = {}) {
  return z
    .object({
      amount: amountValidation,
      date: validDate,
      notes: notesValidation,
    })
    .superRefine(({ amount, date }, ctx) => {
      if (
        maxAmount !== undefined &&
        typeof amount === "number" &&
        toCents(amount) > maxAmount
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["amount"],
          message: `Can't exceed the ${formatAmount(maxAmount, currency)} left to pay`,
        });
      }
      if (minDay && typeof date === "string" && toDay(date) < minDay) {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: `Can't be before the loan start date (${formatCalendarDay(minDay)})`,
        });
      }
    }) satisfies z.ZodType<LoanPaymentInput, LoanPaymentFormValues>;
}
