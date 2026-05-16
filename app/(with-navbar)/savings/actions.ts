'use server';

import type {
  SavingsGoalFormErrors,
  SavingsGoalFormValues,
} from '@/types/savings';
import { savingsGoalSchema } from './validation';
import { getFormErrors } from '@/lib/zod';
import { isUniqueViolationError, UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import { createSavingsGoal as createNewSavingsGoal } from '@/data/savings';
import { toCents } from '@/utils/currency';

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
