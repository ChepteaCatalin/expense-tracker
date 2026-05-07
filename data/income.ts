import 'server-only';

import { authGuard } from '@/lib/auth-utils';
import { Transaction, TransactionFormValues } from '@/types/transaction';
import { sql } from '@/lib/neon';
import { updateTag } from 'next/cache';

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
