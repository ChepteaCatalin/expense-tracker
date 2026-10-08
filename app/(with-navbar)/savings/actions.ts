"use server";

import type {
  SavingsDepositFormErrors,
  SavingsDepositFormValuesWithGoalId,
  SavingsDepositFormValuesWithId,
  SavingsGoalFormErrors,
  SavingsGoalFormValues,
  SavingsGoalFormValuesWithId,
} from "@/types/savings";
import { savingsDepositSchema, savingsGoalSchema } from "./validation";
import { parseForm } from "@/lib/zod";
import { isUniqueViolationError, UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import {
  createSavingsGoal as createNewSavingsGoal,
  updateSavingsGoal as updateExistingSavingsGoal,
  deleteSavingsGoal as deleteExistingSavingsGoal,
  createSavingsDeposit as createNewSavingsDeposit,
  completeSavingsGoal as markAsCompleted,
  reopenSavingsGoal as markAsReopened,
  deleteSavingsDeposit as deleteExistingSavingsDeposit,
  updateSavingsDeposit as updateExistingSavingsDeposit,
} from "@/data/savings";
import { toCents } from "@/utils/currency";
import { getToday } from "@/lib/today";

export async function createSavingsGoal(
  _: SavingsGoalFormErrors,
  goal: SavingsGoalFormValues,
): Promise<SavingsGoalFormErrors> {
  const result = parseForm(savingsGoalSchema, {
    ...goal,
    targetAmount: +goal.targetAmount,
    initialAmount: +goal.initialAmount,
    startDate: String(goal.startDate),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await createNewSavingsGoal({
      ...goal,
      name: data.name,
      targetAmount: toCents(data.targetAmount),
      initialAmount: toCents(data.initialAmount),
      startDate: data.startDate,
      currency: data.currency,
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    if (isUniqueViolationError(err)) {
      return { api: "A goal with this name already exists" };
    }
    return { api: "Failed to create the goal" };
  }

  redirect(`/savings`);
}

export async function updateSavingsGoal(
  _: SavingsGoalFormErrors,
  goal: SavingsGoalFormValuesWithId,
): Promise<SavingsGoalFormErrors> {
  const result = parseForm(savingsGoalSchema, {
    ...goal,
    targetAmount: +goal.targetAmount,
    initialAmount: +goal.initialAmount,
    startDate: String(goal.startDate),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await updateExistingSavingsGoal({
      ...goal,
      name: data.name,
      targetAmount: toCents(data.targetAmount),
      initialAmount: toCents(data.initialAmount),
      startDate: data.startDate,
      currency: data.currency,
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    if (isUniqueViolationError(err)) {
      return { api: "A goal with this name already exists" };
    }
    return { api: "Failed to update the goal" };
  }

  redirect(`/savings/${goal.id}/details`);
}

export async function deleteSavingsGoal(
  _: string,
  id: number,
): Promise<string> {
  try {
    await deleteExistingSavingsGoal(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete savings goal";
  }

  redirect(`/savings`);
}

export async function createSavingsDeposit(
  _: SavingsDepositFormErrors,
  deposit: SavingsDepositFormValuesWithGoalId,
): Promise<SavingsDepositFormErrors> {
  const result = parseForm(savingsDepositSchema, {
    ...deposit,
    amount: +deposit.amount,
    date: String(deposit.date),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await createNewSavingsDeposit({
      ...deposit,
      ...data,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to create goal deposit" };
  }

  return {};
}

export async function completeSavingsGoal(
  _: string | undefined,
  id: number,
): Promise<string | undefined> {
  const today = await getToday();

  try {
    await markAsCompleted(id, today);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to complete savings goal";
  }

  return undefined;
}

export async function reopenSavingsGoal(
  _: string | undefined,
  id: number,
): Promise<string | undefined> {
  try {
    await markAsReopened(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to reopen savings goal";
  }

  return undefined;
}

export async function deleteSavingsDeposit(
  _: string,
  id: number,
): Promise<string> {
  try {
    await deleteExistingSavingsDeposit(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete deposit";
  }

  return "";
}

export async function updateSavingsDeposit(
  _: SavingsDepositFormErrors,
  deposit: SavingsDepositFormValuesWithId,
): Promise<SavingsDepositFormErrors> {
  const result = parseForm(savingsDepositSchema, {
    ...deposit,
    amount: +deposit.amount,
    date: String(deposit.date),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await updateExistingSavingsDeposit({
      ...deposit,
      ...data,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to update goal deposit" };
  }

  return {};
}
