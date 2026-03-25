import 'server-only';

import { sql } from '@/lib/neon';
import { Expense, ExpenseFormValues } from '@/types/expense';
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

      if (!result[0]) throw new Error('Failed to create expense');

      // TODO: invalidate cache

      return new Expense(result[0]);
    },
);
