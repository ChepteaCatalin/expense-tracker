import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import type { SavingsGoal, SavingsGoalFormValues } from '@/types/savings';

export const createSavingsGoal = authGuard(
  session =>
    async (goal: SavingsGoalFormValues): Promise<SavingsGoal> => {
      const result = await sql`
        INSERT INTO savings_goal (
          name,
          initial_amount,
          target_amount,
          start_date,
          notes,
          currency,
          user_id
        ) VALUES (
          ${goal.name},
          ${goal.initialAmount || 0},
          ${goal.targetAmount},
          ${goal.startDate},
          ${goal.notes || null},
          ${goal.currency.code},
          ${session.user.id}
        )
        RETURNING
          id,
          name,
          initial_amount,
          target_amount,
          to_char(start_date, 'YYYY-MM-DD') AS start_date,
          is_completed,
          to_char(completed_date, 'YYYY-MM-DD') AS completed_date,
          notes,
          currency,
          created_at,
          updated_at
      `;

      const created = result[0];

      if (!created) throw new Error('Failed to create savings goal');

      // TODO: invalidate

      return {
        id: created.id,
        name: created.name,
        initialAmount: created.initial_amount,
        currentAmount: 0,
        targetAmount: created.target_amount,
        startDate: new Date(created.start_date),
        isCompleted: created.is_completed,
        completedDate: created.completed_date
          ? new Date(created.completed_date)
          : undefined,
        notes: created.notes ?? undefined,
        currency: created.currency,
      };
    },
);
