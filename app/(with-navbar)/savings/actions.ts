'use server';

import type {
  SavingsGoalFormErrors,
  SavingsGoalFormValues,
  SavingsGoalFormValuesWithId,
} from '@/types/savings';
import { savingsGoalSchema } from './validation';
import { getFormErrors } from '@/lib/zod';
import { isUniqueViolationError, UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import {
  createSavingsGoal as createNewSavingsGoal,
  updateSavingsGoal as updateExistingSavingsGoal,
} from '@/data/savings';
import { toCents } from '@/utils/currency';
import { deleteSavingsGoal as deleteExistingSavingsGoal } from '@/data/savings';

export async function createSavingsGoal(
  _: SavingsGoalFormErrors,
  goal: SavingsGoalFormValues,
): Promise<SavingsGoalFormErrors> {
  const errors = getFormErrors(savingsGoalSchema, {
    ...goal,
    targetAmount: +goal.targetAmount,
    initialAmount: +goal.initialAmount,
    startDate: String(goal.startDate),
  });
  if (errors) return errors;

  try {
    await createNewSavingsGoal({
      ...goal,
      targetAmount: toCents(goal.targetAmount),
      initialAmount: toCents(goal.initialAmount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    if (isUniqueViolationError(err)) {
      return { api: 'A goal with this name already exists' };
    }
    return { api: 'Failed to create the goal' };
  }

  redirect(`/savings`);
}

export async function updateSavingsGoal(
  _: SavingsGoalFormErrors,
  goal: SavingsGoalFormValuesWithId,
): Promise<SavingsGoalFormErrors> {
  const errors = getFormErrors(savingsGoalSchema, {
    ...goal,
    targetAmount: +goal.targetAmount,
    initialAmount: +goal.initialAmount,
    startDate: String(goal.startDate),
  });
  if (errors) return errors;

  try {
    await updateExistingSavingsGoal({
      ...goal,
      targetAmount: toCents(goal.targetAmount),
      initialAmount: toCents(goal.initialAmount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    if (isUniqueViolationError(err)) {
      return { api: 'A goal with this name already exists' };
    }
    return { api: 'Failed to update the goal' };
  }

  redirect(`/savings/${goal.id}/details`);
}

export async function deleteSavingsGoal(_: string, id: number) {
  try {
    await deleteExistingSavingsGoal(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return 'Failed to delete savings goal';
  }

  redirect(`/savings`);
}
