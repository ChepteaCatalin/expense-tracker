import 'server-only';

import { sql } from '@/lib/neon';
import type {
  Expense,
  ExpenseFormValues,
  ExpensesByCategory,
} from '@/types/expense';
import { cache } from 'react';
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

      updateTag(userExpenseCategoriesTag(session.user.id));

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

export const getExpensesCategories = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<ExpensesByCategory[]> =>
      cache(
        async ({
          userId,
          from,
          to,
        }: {
          userId: string;
          from: string;
          to: string;
        }): Promise<ExpensesByCategory[]> => {
          'use cache';
          cacheLife('minutes');
          cacheTag(userExpenseCategoriesTag(userId));

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
              WHERE e.user_id = ${userId}
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
      )({
        userId: session.user.id,
        from,
        to,
      }),
);

function userExpenseCategoriesTag(userId: string) {
  return `expenses/categories/user/${userId}`;
}
