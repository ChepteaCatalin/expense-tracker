import 'server-only';

import { sql } from '@/lib/neon';
import { authGuard } from '@/lib/auth-utils';
import { userTag } from '@/utils/cache';
import type {
  SavingsGoal,
  SavingsGoalFormValues,
  SavingsGoalFormValuesWithId,
  SavingsDeposit,
  SavingsDepositFormValuesWithGoalId,
  SavingsDepositFormValuesWithId,
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
          updated_at,
          initial_amount AS current_amount
      `;

      const created = result[0];

      if (!created) throw new Error('Failed to create savings goal');

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag('savings-goals/list'));

      return savingsGoalFromDb(created);
    },
);

export const getSavingsGoalById = authGuard(
  session =>
    async (id: number): Promise<SavingsGoal | null> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)(`savings-goals/id/${id}`));

      const result = await sql`
        SELECT
          sg.id,
          sg.name,
          sg.initial_amount,
          sg.target_amount,
          to_char(sg.start_date, 'YYYY-MM-DD') AS start_date,
          sg.is_completed,
          to_char(sg.completed_date, 'YYYY-MM-DD') AS completed_date,
          sg.notes,
          sg.currency,
          sg.created_at,
          sg.updated_at,
          sg.initial_amount + COALESCE(SUM(sd.amount), 0) AS current_amount
        FROM savings_goal sg
        LEFT JOIN savings_deposit sd ON sd.savings_goal_id = sg.id
        WHERE sg.id = ${id}
          AND sg.user_id = ${session.user.id}
        GROUP BY sg.id
      `;

      const row = result[0];
      if (!row) return null;

      return savingsGoalFromDb(row);
    },
);

export const getAllSavingsGoals = authGuard(
  session => async (): Promise<SavingsGoal[]> => {
    'use cache';
    cacheLife('max');
    cacheTag(userTag(session.user.id)('savings-goals/list'));

    try {
      const result = await sql`
        SELECT
          sg.id,
          sg.name,
          sg.initial_amount,
          sg.target_amount,
          to_char(sg.start_date, 'YYYY-MM-DD') AS start_date,
          sg.is_completed,
          to_char(sg.completed_date, 'YYYY-MM-DD') AS completed_date,
          sg.notes,
          sg.currency,
          sg.created_at,
          sg.updated_at,
          sg.initial_amount + COALESCE(SUM(sd.amount), 0) AS current_amount
        FROM savings_goal sg
        LEFT JOIN savings_deposit sd ON sd.savings_goal_id = sg.id
        WHERE sg.user_id = ${session.user.id}
        GROUP BY sg.id
        ORDER BY sg.is_completed ASC, sg.start_date DESC
      `;

      return result.map(row => savingsGoalFromDb(row));
    } catch {
      return [];
    }
  },
);

export const updateSavingsGoal = authGuard(
  session =>
    async (goal: SavingsGoalFormValuesWithId): Promise<SavingsGoal> => {
      const result = await sql`
        WITH updated AS (
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
            AND is_completed = false
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
        )
        SELECT
          u.*,
          u.initial_amount + COALESCE(SUM(sd.amount), 0) AS current_amount
        FROM updated u
        LEFT JOIN savings_deposit sd ON sd.savings_goal_id = u.id
        GROUP BY u.id, u.name, u.initial_amount, u.target_amount, u.start_date,
                 u.is_completed, u.completed_date, u.notes, u.currency,
                 u.created_at, u.updated_at
      `;

      const updated = result[0];

      if (!updated) throw new Error('Failed to update savings goal');

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag(`savings-goals/id/${goal.id}`));
      updateTag(tag('savings-goals/list'));

      return savingsGoalFromDb(updated);
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
    updateTag(tag('savings'));
    updateTag(tag(`savings-goals/id/${goalId}`));
    updateTag(tag('savings-goals/list'));
  },
);

export const completeSavingsGoal = authGuard(
  session =>
    async (goalId: number): Promise<void> => {
      const result = await sql`
        UPDATE savings_goal
        SET
          is_completed = true,
          completed_date = CURRENT_DATE,
          updated_at = NOW()
        WHERE id = ${goalId}
          AND user_id = ${session.user.id}
          AND is_completed = false
        RETURNING id
      `;

      if (!result[0]) throw new Error('Failed to complete savings goal');

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag(`savings-goals/id/${goalId}`));
      updateTag(tag('savings-goals/list'));
    },
);

export const reopenSavingsGoal = authGuard(
  session =>
    async (goalId: number): Promise<void> => {
      const result = await sql`
        UPDATE savings_goal
        SET
          is_completed = false,
          completed_date = NULL,
          updated_at = NOW()
        WHERE id = ${goalId}
          AND user_id = ${session.user.id}
          AND is_completed = true
        RETURNING id
      `;

      if (!result[0]) throw new Error('Failed to reopen savings goal');

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag(`savings-goals/id/${goalId}`));
      updateTag(tag('savings-goals/list'));
    },
);

function savingsGoalFromDb(dbResult: Record<string, any>): SavingsGoal {
  return {
    id: dbResult.id,
    name: dbResult.name,
    initialAmount: dbResult.initial_amount,
    currentAmount: Number(dbResult.current_amount),
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

export const createSavingsDeposit = authGuard(
  session =>
    async (
      deposit: SavingsDepositFormValuesWithGoalId,
    ): Promise<SavingsDeposit> => {
      const result = await sql`
        INSERT INTO savings_deposit (
          savings_goal_id,
          amount,
          date,
          notes
        )
        SELECT
          ${deposit.goalId},
          ${deposit.amount},
          ${deposit.date},
          ${deposit.notes || null}
        WHERE EXISTS (
          SELECT 1 FROM savings_goal
          WHERE id = ${deposit.goalId}
            AND user_id = ${session.user.id}
            AND is_completed = false
        )
        RETURNING
          id,
          savings_goal_id,
          amount,
          to_char(date, 'YYYY-MM-DD') AS date,
          notes,
          created_at,
          updated_at
      `;

      const created = result[0];

      if (!created) throw new Error('Failed to create goal deposit');

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag(`savings-goals/id/${deposit.goalId}`));
      updateTag(tag('savings-goals/list'));
      updateTag(tag(`savings-deposits/goal/${deposit.goalId}`));

      return savingsDepositFromDb(created);
    },
);

export const getSavingsDepositsByGoalId = authGuard(
  session =>
    async (goalId: number): Promise<SavingsDeposit[]> => {
      'use cache';
      cacheLife('max');
      cacheTag(userTag(session.user.id)(`savings-deposits/goal/${goalId}`));

      try {
        const result = await sql`
          SELECT
            sd.id,
            sd.savings_goal_id,
            sd.amount,
            to_char(sd.date, 'YYYY-MM-DD') AS date,
            sd.notes,
            sd.created_at,
            sd.updated_at
          FROM savings_deposit sd
          INNER JOIN savings_goal sg ON sg.id = sd.savings_goal_id
          WHERE sd.savings_goal_id = ${goalId}
            AND sg.user_id = ${session.user.id}
          ORDER BY sd.date DESC
        `;

        return result.map(savingsDepositFromDb);
      } catch {
        return [];
      }
    },
);

export const updateSavingsDeposit = authGuard(
  session =>
    async (
      deposit: SavingsDepositFormValuesWithId,
    ): Promise<SavingsDeposit> => {
      const result = await sql`
        UPDATE savings_deposit sd
        SET
          amount = ${deposit.amount},
          date = ${deposit.date},
          notes = ${deposit.notes || null},
          updated_at = NOW()
        FROM savings_goal sg
        WHERE sd.id = ${deposit.id}
          AND sd.savings_goal_id = sg.id
          AND sg.user_id = ${session.user.id}
          AND sg.is_completed = false
        RETURNING
          sd.id,
          sd.savings_goal_id,
          sd.amount,
          to_char(sd.date, 'YYYY-MM-DD') AS date,
          sd.notes,
          sd.created_at,
          sd.updated_at
      `;

      const updated = result[0];
      if (!updated) throw new Error('Failed to update savings deposit');

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag(`savings-goals/id/${deposit.goalId}`));
      updateTag(tag('savings-goals/list'));
      updateTag(tag(`savings-deposits/goal/${deposit.goalId}`));

      return savingsDepositFromDb(updated);
    },
);

export const deleteSavingsDeposit = authGuard(
  session =>
    async (depositId: number): Promise<void> => {
      const result = await sql`
        DELETE FROM savings_deposit sd
        USING savings_goal sg
        WHERE sd.id = ${depositId}
          AND sd.savings_goal_id = sg.id
          AND sg.user_id = ${session.user.id}
          AND sg.is_completed = false
        RETURNING sd.savings_goal_id AS goal_id
      `;

      const deleted = result[0];
      if (!deleted) {
        throw new Error('Savings deposit not found or delete failed');
      }

      const tag = userTag(session.user.id);
      updateTag(tag('savings'));
      updateTag(tag(`savings-goals/id/${deleted.goal_id}`));
      updateTag(tag('savings-goals/list'));
      updateTag(tag(`savings-deposits/goal/${deleted.goal_id}`));
    },
);

function savingsDepositFromDb(dbResult: Record<string, any>): SavingsDeposit {
  return {
    id: dbResult.id,
    goalId: dbResult.savings_goal_id,
    amount: dbResult.amount,
    date: new Date(dbResult.date),
    notes: dbResult.notes ?? undefined,
    createdAt: new Date(dbResult.created_at),
    updatedAt: new Date(dbResult.updated_at),
  };
}
