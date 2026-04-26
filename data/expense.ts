import 'server-only';

import { sql } from '@/lib/neon';
import type {
  Expense,
  ExpenseFormValues,
  ExpenseCategory,
  ExpensesByDate,
  SortExpenseBy,
  ExpenseFormValuesWithId,
} from '@/types/expense';
import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { authGuard } from '@/lib/auth-utils';

export const createExpense = authGuard(
  session =>
    async (expense: ExpenseFormValues): Promise<Expense> => {
      const result = await sql`
        INSERT INTO expense (
          amount,
          category_id,
          date,
          description,
          user_id
        ) VALUES (
          ${expense.amount},
          ${expense.categoryId},
          ${expense.date},
          ${expense.description},
          ${session.user.id}
        )
        RETURNING
          id,
          amount,
          category_id,
          to_char(date, 'YYYY-MM-DD') AS date,
          description,
          created_at,
          updated_at
      `;

      const createdExpense = result[0];

      if (!createdExpense) throw new Error('Failed to create expense');

      updateTag('expenses/categories');
      updateTag(`expenses/category/${expense.categoryId}`);

      return {
        id: createdExpense.id,
        amount: createdExpense.amount,
        categoryId: createdExpense.category_id,
        date: new Date(createdExpense.date),
        description: createdExpense.description,
        createdAt: new Date(createdExpense.created_at),
        updatedAt: new Date(createdExpense.updated_at),
      };
    },
);

export const updateExpense = authGuard(
  session =>
    async (expense: ExpenseFormValuesWithId): Promise<Expense> => {
      const result = await sql`
        UPDATE expense
        SET
          amount = ${expense.amount},
          category_id = ${expense.categoryId},
          date = ${expense.date},
          description = ${expense.description},
          updated_at = NOW()
        WHERE
          id = ${expense.id}
          AND user_id = ${session.user.id}
        RETURNING
          id,
          amount,
          category_id,
          to_char(date, 'YYYY-MM-DD') AS date,
          description,
          created_at,
          updated_at
      `;

      const editedExpense = result[0];

      if (!editedExpense) throw new Error('Failed to edit expense');

      updateTag('expenses/categories');
      updateTag(`expenses/category/${expense.categoryId}`);
      updateTag(`expenses/id/${expense.id}`);

      return {
        id: editedExpense.id,
        amount: editedExpense.amount,
        categoryId: editedExpense.category_id,
        date: new Date(editedExpense.date),
        description: editedExpense.description,
        createdAt: new Date(editedExpense.created_at),
        updatedAt: new Date(editedExpense.updated_at),
      };
    },
);

export const deleteExpense = authGuard(
  session =>
    async (expenseId: number): Promise<void> => {
      const result = await sql`
        DELETE FROM expense
        WHERE id = ${expenseId}
          AND user_id = ${session.user.id}
        RETURNING id, category_id
      `;

      const deletedExpense = result[0];

      if (!deletedExpense) throw new Error('Failed to delete expense');

      updateTag('expenses/categories');
      updateTag(`expenses/category/${deletedExpense.category_id}`);
      updateTag(`expenses/id/${expenseId}`);
    },
);

export const getExpenseCategories = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<ExpenseCategory[]> => {
      'use cache';
      cacheLife('minutes');
      cacheTag('expenses/categories');

      try {
        const result = await sql`
          SELECT
            c.id AS category_id,
            c.name,
            c.icon,
            c.stroke_color,
            c.background_color,
            SUM(e.amount) AS total_amount
          FROM expense e
          JOIN category c ON e.category_id = c.id
          WHERE e.user_id = ${session.user.id}
            AND e.date >= ${from}::date
            AND e.date <= ${to}::date
          GROUP BY c.id, c.name, c.icon, c.stroke_color, c.background_color
          ORDER BY total_amount DESC
        `;

        return result.map(row => ({
          categoryId: row.category_id,
          name: row.name,
          icon: row.icon,
          strokeColor: row.stroke_color,
          backgroundColor: row.background_color,
          totalAmount: +row.total_amount,
        }));
      } catch {
        return [];
      }
    },
);

export const getExpenseById = authGuard(
  session =>
    async (expenseId: number): Promise<Expense | undefined> => {
      'use cache';
      cacheLife('minutes');
      cacheTag(`expenses/id/${expenseId}`);

      try {
        const result = await sql`
          SELECT
            id,
            amount,
            category_id,
            to_char(date, 'YYYY-MM-DD') AS date,
            description,
            created_at,
            updated_at
          FROM expense
          WHERE id = ${expenseId}
            AND user_id = ${session.user.id}
        `;

        const row = result[0];
        if (!row) return undefined;

        return {
          id: row.id,
          amount: row.amount,
          categoryId: row.category_id,
          date: new Date(row.date),
          description: row.description,
          createdAt: new Date(row.created_at),
          updatedAt: new Date(row.updated_at),
        };
      } catch {
        return undefined;
      }
    },
);

export const getExpenseCategoryTotal = authGuard(
  session =>
    async ({
      categoryId,
      from,
      to,
    }: {
      categoryId: string;
      from: string;
      to: string;
    }): Promise<number> => {
      'use cache';
      cacheLife('minutes');
      cacheTag(`expenses/category/${categoryId}`);

      try {
        const result = await sql`
          SELECT COALESCE(SUM(amount), 0) AS total_amount
          FROM expense
          WHERE user_id = ${session.user.id}
            AND category_id = ${categoryId}
            AND date >= ${from}::date
            AND date <= ${to}::date
        `;

        return +(result[0]?.total_amount ?? 0);
      } catch {
        return 0;
      }
    },
);

export const getExpensesByCategory = authGuard(
  session =>
    async ({
      categoryId,
      from,
      to,
      sortBy = 'date',
    }: {
      categoryId: string;
      from: string;
      to: string;
      sortBy?: SortExpenseBy;
    }): Promise<ExpensesByDate[]> => {
      'use cache';
      cacheLife('minutes');
      cacheTag(`expenses/category/${categoryId}`);

      try {
        const result = await sql`
          SELECT
            e.id,
            e.amount,
            e.category_id,
            c.name,
            to_char(e.date, 'YYYY-MM-DD') AS date,
            e.description,
            e.created_at,
            e.updated_at,
            c.icon,
            c.stroke_color,
            c.background_color
          FROM expense e
          JOIN category c ON e.category_id = c.id
          WHERE e.user_id = ${session.user.id}
            AND e.category_id = ${categoryId}
            AND e.date >= ${from}::date
            AND e.date <= ${to}::date
          ORDER BY e.date DESC, e.amount DESC
        `;

        const groupedByDate = Object.groupBy(result, row => row.date);

        const days = Object.entries(groupedByDate).flatMap(([date, rows]) => {
          if (!rows) return [];

          const expenses = rows.map(row => ({
            id: row.id,
            amount: +row.amount,
            categoryId: row.category_id,
            date: new Date(row.date),
            description: row.description,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
          }));

          return [
            {
              date: new Date(date),
              expenses,
              categoryName: rows[0]!.name,
              icon: rows[0]!.icon,
              strokeColor: rows[0]!.stroke_color,
              backgroundColor: rows[0]!.background_color,
            },
          ];
        });

        if (sortBy === 'amount') {
          days.sort(
            (a, b) => getExpensesSum(b.expenses) - getExpensesSum(a.expenses),
          );
        } else {
          days.sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        return days;
      } catch {
        return [];
      }
    },
);

function getExpensesSum(expenses: Expense[]): number {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}
