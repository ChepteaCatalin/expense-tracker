import 'server-only';

import { authGuard } from '@/lib/auth-utils';
import { userTag } from '@/utils/cache';
import type {
  SortTransactionBy,
  TransactionsByDate,
  Transaction,
  TransactionCategory,
  TransactionFormValues,
  TransactionFormValuesWithId,
} from '@/types/transaction';
import { sql } from '@/lib/neon';
import { cacheLife, cacheTag, updateTag } from 'next/cache';

export const createIncome = authGuard(
  session =>
    async (income: TransactionFormValues): Promise<Transaction> => {
      const result = await sql`
        INSERT INTO income (
          amount,
          category_id,
          date,
          description,
          user_id
        ) VALUES (
          ${income.amount},
          ${income.categoryId},
          ${income.date},
          ${income.description},
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

      const createdIncome = result[0];

      if (!createdIncome) throw new Error('Failed to create income');

      updateTag(userTag(session.user.id)('incomes/categories'));
      updateTag(
        userTag(session.user.id)(`incomes/category/${income.categoryId}`),
      );

      return {
        id: createdIncome.id,
        amount: createdIncome.amount,
        categoryId: createdIncome.category_id,
        date: new Date(createdIncome.date),
        description: createdIncome.description,
        createdAt: new Date(createdIncome.created_at),
        updatedAt: new Date(createdIncome.updated_at),
      };
    },
);

export const getIncomeById = authGuard(
  session =>
    async (incomeId: number): Promise<Transaction | undefined> => {
      'use cache';
      cacheLife('minutes');
      cacheTag(userTag(session.user.id)(`incomes/id/${incomeId}`));

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
          FROM income
          WHERE id = ${incomeId}
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

export const updateIncome = authGuard(
  session =>
    async (income: TransactionFormValuesWithId): Promise<Transaction> => {
      const result = await sql`
        UPDATE income
        SET
          amount = ${income.amount},
          category_id = ${income.categoryId},
          date = ${income.date},
          description = ${income.description},
          updated_at = NOW()
        WHERE
          id = ${income.id}
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

      const editedIncome = result[0];

      if (!editedIncome) throw new Error('Failed to edit income');

      const tag = userTag(session.user.id);
      updateTag(tag('incomes/categories'));
      updateTag(tag(`incomes/category/${income.categoryId}`));
      updateTag(tag(`incomes/id/${income.id}`));

      return {
        id: editedIncome.id,
        amount: editedIncome.amount,
        categoryId: editedIncome.category_id,
        date: new Date(editedIncome.date),
        description: editedIncome.description,
        createdAt: new Date(editedIncome.created_at),
        updatedAt: new Date(editedIncome.updated_at),
      };
    },
);

export const deleteIncome = authGuard(
  session =>
    async (incomeId: number): Promise<{ id: number; categoryId: number }> => {
      const result = await sql`
        DELETE FROM income
        WHERE id = ${incomeId}
          AND user_id = ${session.user.id}
        RETURNING id, category_id
      `;

      const deletedIncome = result[0];

      if (!deletedIncome) throw new Error('Failed to delete income');

      const tag = userTag(session.user.id);
      updateTag(tag('incomes/categories'));
      updateTag(tag(`incomes/category/${deletedIncome.category_id}`));
      updateTag(tag(`incomes/id/${incomeId}`));

      return { id: deletedIncome.id, categoryId: deletedIncome.category_id };
    },
);

export const getIncomeCategories = authGuard(
  session =>
    async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }): Promise<TransactionCategory[]> => {
      'use cache';
      cacheLife('minutes');
      cacheTag(userTag(session.user.id)('incomes/categories'));

      try {
        const result = await sql`
          SELECT
            c.id AS category_id,
            c.name,
            c.icon,
            c.stroke_color,
            c.background_color,
            SUM(i.amount) AS total_amount
          FROM income i
          JOIN category c ON i.category_id = c.id
          WHERE i.user_id = ${session.user.id}
            AND i.date >= ${from}::date
            AND i.date <= ${to}::date
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

export const getIncomesByCategory = authGuard(
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
      sortBy?: SortTransactionBy;
    }): Promise<TransactionsByDate[]> => {
      'use cache';
      cacheLife('minutes');
      cacheTag(userTag(session.user.id)(`incomes/category/${categoryId}`));

      try {
        const result = await sql`
          SELECT
            i.id,
            i.amount,
            i.category_id,
            c.name,
            to_char(i.date, 'YYYY-MM-DD') AS date,
            i.description,
            i.created_at,
            i.updated_at,
            c.icon,
            c.stroke_color,
            c.background_color
          FROM income i
          JOIN category c ON i.category_id = c.id
          WHERE i.user_id = ${session.user.id}
            AND i.category_id = ${categoryId}
            AND i.date >= ${from}::date
            AND i.date <= ${to}::date
          ORDER BY i.date DESC, i.amount DESC
        `;

        const groupedByDate = Object.groupBy(result, row => row.date);

        const days = Object.entries(groupedByDate).flatMap(([date, rows]) => {
          if (!rows) return [];

          const transactions = rows.map(row => ({
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
              transactions,
              categoryName: rows[0]!.name,
              icon: rows[0]!.icon,
              strokeColor: rows[0]!.stroke_color,
              backgroundColor: rows[0]!.background_color,
            },
          ];
        });

        if (sortBy === 'amount') {
          days.sort(
            (a, b) =>
              getIncomesSum(b.transactions) - getIncomesSum(a.transactions),
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

export const getIncomeCategoryTotal = authGuard(
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
      cacheTag(userTag(session.user.id)(`incomes/category/${categoryId}`));

      try {
        const result = await sql`
          SELECT COALESCE(SUM(amount), 0) AS total_amount
          FROM income
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

function getIncomesSum(incomes: Transaction[]): number {
  return incomes.reduce((sum, inc) => sum + inc.amount, 0);
}
