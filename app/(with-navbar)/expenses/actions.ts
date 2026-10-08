"use server";

import { parseForm } from "@/lib/zod";
import {
  type TransactionFormValuesWithId,
  type TransactionFormErrors,
  type TransactionFormValues,
} from "@/types/transaction";
import { transactionSchema } from "@/utils/validation";
import { UnauthorizedError } from "@/utils/error";
import { redirect } from "next/navigation";
import {
  createExpense as createNewExpense,
  updateExpense as updateExistingExpense,
  deleteExpense as deleteExistingExpense,
} from "@/data/expense";
import { toCents } from "@/utils/currency";
import { getToday } from "@/lib/today";

export async function createExpense(
  searchParams: string,
  _: TransactionFormErrors,
  expense: TransactionFormValues,
): Promise<TransactionFormErrors> {
  const result = parseForm(transactionSchema, expense);
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await createNewExpense({
      ...expense,
      ...data,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to add the expense" };
  }

  if (searchParams.includes("sortBy")) {
    redirect(await toExpensesCategoryPage(searchParams, data.categoryId));
  } else {
    redirect(
      searchParams
        ? `/expenses/categories?${searchParams}`
        : `/expenses/categories?month=${await getToday()}`,
    );
  }
}

export async function updateExpense(
  searchParams: string,
  _: TransactionFormErrors,
  expense: TransactionFormValuesWithId,
): Promise<TransactionFormErrors> {
  const result = parseForm(transactionSchema, {
    ...expense,
    amount: +expense.amount,
    categoryId: +expense.categoryId,
    date: String(expense.date),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await updateExistingExpense({
      ...expense,
      ...data,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to edit the expense" };
  }

  redirect(await toExpensesCategoryPage(searchParams, data.categoryId));
}

export async function deleteExpense(
  searchParams: string,
  _: string,
  { id }: { id: number },
): Promise<string> {
  try {
    var { categoryId } = await deleteExistingExpense(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete expense";
  }

  redirect(await toExpensesCategoryPage(searchParams, categoryId));
}

async function toExpensesCategoryPage(
  searchParams: string,
  categoryId: number,
) {
  return searchParams
    ? `/expenses/category/${categoryId}?${searchParams}`
    : `/expenses/categories?month=${await getToday()}`;
}
