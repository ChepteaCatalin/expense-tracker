'use server';

import type {
  SavingsDepositFormErrors,
  SavingsDepositFormValuesWithGoalId,
  SavingsGoalFormErrors,
  SavingsGoalFormValues,
  SavingsGoalFormValuesWithId,
} from '@/types/savings';
import { savingsDepositSchema, savingsGoalSchema } from './validation';
import { getFormErrors } from '@/lib/zod';
import { isUniqueViolationError, UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import {
  createSavingsGoal as createNewSavingsGoal,
  updateSavingsGoal as updateExistingSavingsGoal,
  deleteSavingsGoal as deleteExistingSavingsGoal,
  createSavingsDeposit as createNewSavingsDeposit,
  completeSavingsGoal as markAsCompleted,
  reopenSavingsGoal as markAsReopened,
  deleteSavingsDeposit as deleteExistingSavingsDeposit,
} from '@/data/savings';
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

export async function createSavingsDeposit(
  _: SavingsDepositFormErrors,
  deposit: SavingsDepositFormValuesWithGoalId,
): Promise<SavingsDepositFormErrors> {
  const errors = getFormErrors(savingsDepositSchema, {
    ...deposit,
    amount: +deposit.amount,
    date: String(deposit.date),
  });
  if (errors) return errors;

  try {
    await createNewSavingsDeposit({
      ...deposit,
      amount: toCents(deposit.amount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return { api: 'Failed to create goal deposit' };
  }

  return {};
}

export async function completeSavingsGoal(
  _: string | undefined,
  id: number,
): Promise<string | undefined> {
  try {
    await markAsCompleted(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return 'Failed to complete savings goal';
  }
}

export async function reopenSavingsGoal(
  _: string | undefined,
  id: number,
): Promise<string | undefined> {
  try {
    await markAsReopened(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return 'Failed to reopen savings goal';
  }
}

export async function deleteSavingsDeposit(_: string, id: number) {
  try {
    await deleteExistingSavingsDeposit(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return 'Failed to delete deposit';
  }

  return '';
}
