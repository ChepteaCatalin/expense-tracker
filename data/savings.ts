import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import type { SavingsGoal, SavingsGoalFormValues } from '@/types/savings';
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

      //TODO: invalidate list (add this cache key to it)
      updateTag('savings-goals/list');

      return {
        id: created.id,
        name: created.name,
        initialAmount: created.initial_amount,
        currentAmount: created.initial_amount,
        targetAmount: created.target_amount,
        startDate: new Date(created.start_date),
        isCompleted: created.is_completed,
        completedDate: created.completed_date
          ? new Date(created.completed_date)
          : undefined,
        notes: created.notes ?? undefined,
        currency: created.currency,
        createdAt: new Date(created.created_at),
        updatedAt: new Date(created.updated_at),
      };
    },
);

export const getSavingsGoalById = authGuard(
  session =>
    async (id: number): Promise<SavingsGoal | null> => {
      'use cache';
      cacheLife('weeks');
      cacheTag(`savings-goals/id/${id}`);

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

      return {
        id: row.id,
        name: row.name,
        initialAmount: row.initial_amount,
        currentAmount: row.initial_amount, //TODO: real target amount, based on savings goals
        targetAmount: row.target_amount,
        startDate: new Date(row.start_date),
        isCompleted: row.is_completed,
        completedDate: row.completed_date
          ? new Date(row.completed_date)
          : undefined,
        notes: row.notes ?? undefined,
        currency: row.currency,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      };
    },
);
