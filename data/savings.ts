import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import { userTag } from '@/utils/cache';
import type {
  SavingsGoal,
  SavingsGoalFormValues,
  SavingsGoalFormValuesWithId,
} from '@/types/savings';
import { cacheLife, cacheTag, updateTag } from 'next/cache';

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

      updateTag(userTag(session.user.id)('savings-goals/list'));

      return savingsGoalFromDb(created, created.initial_amount);
    },
);

export const getSavingsGoalById = authGuard(
  session =>
    async (id: number): Promise<SavingsGoal | null> => {
      'use cache';
      cacheLife('weeks');
      cacheTag(userTag(session.user.id)(`savings-goals/id/${id}`));

      const result = await sql`
        SELECT
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
        FROM savings_goal
        WHERE id = ${id}
          AND user_id = ${session.user.id}
      `;

      const row = result[0];
      if (!row) return null;

      return savingsGoalFromDb(row, row.initial_amount); //TODO: real current amount, based on savings goals
    },
);

export const getAllSavingsGoals = authGuard(
  session => async (): Promise<SavingsGoal[]> => {
    'use cache';
    cacheLife('weeks');
    cacheTag(userTag(session.user.id)('savings-goals/list'));

    try {
      const result = await sql`
        SELECT
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
        FROM savings_goal
        WHERE user_id = ${session.user.id}
        ORDER BY start_date DESC
      `;

      return result.map(row => savingsGoalFromDb(row, 0)); //TODO: real current amount, based on savings goals
    } catch {
      return [];
    }
  },
);

export const updateSavingsGoal = authGuard(
  session =>
    async (goal: SavingsGoalFormValuesWithId): Promise<SavingsGoal> => {
      const result = await sql`
        UPDATE savings_goal
        SET
          name = ${goal.name},
          initial_amount = ${goal.initialAmount || 0},
          target_amount = ${goal.targetAmount},
          start_date = ${goal.startDate},
          notes = ${goal.notes || null},
          currency = ${goal.currency.code},
          updated_at = NOW()
        WHERE id = ${goal.id}
          AND user_id = ${session.user.id}
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

      const updated = result[0];

      if (!updated) throw new Error('Failed to update savings goal');

      const tag = userTag(session.user.id);
      updateTag(tag(`savings-goals/id/${goal.id}`));
      updateTag(tag('savings-goals/list'));

      return savingsGoalFromDb(updated, updated.initial_amount); //TODO: real target amount, based on savings goals
    },
);

export const deleteSavingsGoal = authGuard(
  session => async (goalId: number) => {
    const result = await sql`
      DELETE FROM savings_goal
      WHERE id = ${goalId} AND user_id = ${session.user.id}
      RETURNING id
    `;

    if (!result[0]) throw new Error('Savings goal not found or delete failed');

    const tag = userTag(session.user.id);
    updateTag(tag(`savings-goals/id/${goalId}`));
    updateTag(tag('savings-goals/list'));
  },
);

function savingsGoalFromDb(
  dbResult: Record<string, any>,
  currentAmount: number,
): SavingsGoal {
  return {
    id: dbResult.id,
    name: dbResult.name,
    initialAmount: dbResult.initial_amount,
    currentAmount: currentAmount,
    targetAmount: dbResult.target_amount,
    startDate: new Date(dbResult.start_date),
    isCompleted: dbResult.is_completed,
    completedDate: dbResult.completed_date
      ? new Date(dbResult.completed_date)
      : undefined,
    notes: dbResult.notes ?? undefined,
    currency: dbResult.currency,
    createdAt: new Date(dbResult.created_at),
    updatedAt: new Date(dbResult.updated_at),
  };
}
