import 'server-only';

import { authGuard } from '@/lib/auth-utils';
import {
  Transaction,
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

      //TODO: check these
      updateTag('incomes/categories');
      updateTag(`incomes/category/${income.categoryId}`);

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
      cacheTag(`incomes/id/${incomeId}`);

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

      updateTag('incomes/categories');
      updateTag(`incomes/category/${income.categoryId}`);
      updateTag(`incomes/id/${income.id}`);

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

      updateTag('incomes/categories');
      updateTag(`incomes/category/${deletedIncome.category_id}`);
      updateTag(`incomes/id/${incomeId}`);

      return { id: deletedIncome.id, categoryId: deletedIncome.category_id };
    },
);
