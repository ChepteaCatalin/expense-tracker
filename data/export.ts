import "server-only";

import { sql } from "@/lib/neon";
import { authGuard } from "@/lib/auth-utils";
import { fromCents } from "@/utils/currency";
import type { CategoryType } from "@/types/category";

interface Timestamps {
  created_at: Date;
  updated_at: Date;
}

interface CategoryExportRow extends Timestamps {
  id: number;
  name: string;
  type: CategoryType;
  icon: string;
  stroke_color: string;
  background_color: string;
}

interface TransactionExportRow extends Timestamps {
  id: number;
  amount: number;
  category_id: number;
  category_name: string;
  date: string;
  description: string | null;
}

interface SavingsGoalExportRow extends Timestamps {
  id: number;
  name: string;
  initial_amount: number;
  target_amount: number;
  start_date: string;
  is_completed: boolean;
  completed_date: string | null;
  notes: string | null;
  currency: string;
}

interface SavingsDepositExportRow extends Timestamps {
  id: number;
  savings_goal_id: number;
  savings_goal_name: string;
  amount: number;
  date: string;
  notes: string | null;
}

interface SignInMethodExportRow {
  providerId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionExportRow {
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}

export const getUserDataExport = authGuard((session) => async () => {
  const userId = session.user.id;

  const [
    categories,
    expenses,
    incomes,
    savingsGoals,
    savingsDeposits,
    signInMethods,
    sessions,
  ] = await Promise.all([
    sql<CategoryExportRow>`
        SELECT id, name, type, icon, stroke_color, background_color, created_at, updated_at
        FROM category
        WHERE user_id = ${userId}
        ORDER BY id
      `,
    sql<TransactionExportRow>`
        SELECT e.id, e.amount, e.category_id, c.name AS category_name,
          to_char(e.date, 'YYYY-MM-DD') AS date, e.description, e.created_at, e.updated_at
        FROM expense e
        JOIN category c ON c.id = e.category_id AND c.user_id = e.user_id
        WHERE e.user_id = ${userId}
        ORDER BY e.date, e.id
      `,
    sql<TransactionExportRow>`
        SELECT i.id, i.amount, i.category_id, c.name AS category_name,
          to_char(i.date, 'YYYY-MM-DD') AS date, i.description, i.created_at, i.updated_at
        FROM income i
        JOIN category c ON c.id = i.category_id AND c.user_id = i.user_id
        WHERE i.user_id = ${userId}
        ORDER BY i.date, i.id
      `,
    sql<SavingsGoalExportRow>`
        SELECT id, name, initial_amount, target_amount,
          to_char(start_date, 'YYYY-MM-DD') AS start_date, is_completed,
          to_char(completed_date, 'YYYY-MM-DD') AS completed_date,
          notes, currency, created_at, updated_at
        FROM savings_goal
        WHERE user_id = ${userId}
        ORDER BY id
      `,
    sql<SavingsDepositExportRow>`
        SELECT d.id, d.savings_goal_id, g.name AS savings_goal_name, d.amount,
          to_char(d.date, 'YYYY-MM-DD') AS date, d.notes, d.created_at, d.updated_at
        FROM savings_deposit d
        JOIN savings_goal g ON g.id = d.savings_goal_id
        WHERE g.user_id = ${userId}
        ORDER BY d.date, d.id
      `,
    sql<SignInMethodExportRow>`
        SELECT "providerId", "accountId", "createdAt", "updatedAt"
        FROM account
        WHERE "userId" = ${userId}
        ORDER BY "createdAt"
      `,
    sql<SessionExportRow>`
        SELECT "createdAt", "updatedAt", "expiresAt", "ipAddress", "userAgent"
        FROM session
        WHERE "userId" = ${userId}
        ORDER BY "createdAt"
      `,
  ]);

  return {
    exportedAt: new Date().toISOString(),
    format:
      "All monetary amounts are expressed in major currency units (e.g. 10.50)",
    profile: {
      id: userId,
      name: session.user.name,
      email: session.user.email,
      emailVerified: session.user.emailVerified,
      image: session.user.image ?? null,
      currency: session.user.currency,
      createdAt: session.user.createdAt,
      updatedAt: session.user.updatedAt,
    },
    signInMethods: signInMethods.map((row) => ({
      provider: row.providerId,
      accountId: row.accountId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    sessions,
    categories: categories.map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      icon: row.icon,
      strokeColor: row.stroke_color,
      backgroundColor: row.background_color,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
    expenses: expenses.map(transactionFromDb),
    incomes: incomes.map(transactionFromDb),
    savingsGoals: savingsGoals.map((row) => ({
      id: row.id,
      name: row.name,
      initialAmount: fromCents(row.initial_amount),
      targetAmount: fromCents(row.target_amount),
      startDate: row.start_date,
      isCompleted: row.is_completed,
      completedDate: row.completed_date,
      notes: row.notes,
      currency: row.currency,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
    savingsDeposits: savingsDeposits.map((row) => ({
      id: row.id,
      savingsGoalId: row.savings_goal_id,
      savingsGoalName: row.savings_goal_name,
      amount: fromCents(row.amount),
      date: row.date,
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
  };
});

function transactionFromDb(row: TransactionExportRow) {
  return {
    id: row.id,
    amount: fromCents(row.amount),
    categoryId: row.category_id,
    categoryName: row.category_name,
    date: row.date,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
