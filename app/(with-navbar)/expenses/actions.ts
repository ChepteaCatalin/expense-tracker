"use server";

import { getFormErrors } from "@/lib/zod";
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
import dayjs from "dayjs";

export async function createExpense(
  searchParams: string,
  _: TransactionFormErrors,
  expense: TransactionFormValues,
): Promise<TransactionFormErrors> {
  const errors = getFormErrors(transactionSchema, expense);
  if (errors) return errors;

  try {
    await createNewExpense({
      ...expense,
      amount: toCents(expense.amount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to add the expense" };
  }

  if (searchParams.includes("sortBy")) {
    redirect(toExpensesCategoryPage(searchParams, +expense.categoryId));
  } else {
    redirect(
      searchParams
        ? `/expenses/categories?${searchParams}`
        : `/expenses/categories?month=${dayjs().format("YYYY-MM-DD")}`,
    );
  }
}

export async function updateExpense(
  searchParams: string,
  _: TransactionFormErrors,
  expense: TransactionFormValuesWithId,
): Promise<TransactionFormErrors> {
  const errors = getFormErrors(transactionSchema, {
    ...expense,
    amount: +expense.amount,
    categoryId: +expense.categoryId,
    date: String(expense.date),
  });
  if (errors) return errors;

  try {
    await updateExistingExpense({
      ...expense,
      amount: toCents(expense.amount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to edit the expense" };
  }

  redirect(toExpensesCategoryPage(searchParams, +expense.categoryId));
}

export async function deleteExpense(
  searchParams: string,
  _: string,
  { id }: { id: number },
) {
  try {
    var { categoryId } = await deleteExistingExpense(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete expense";
  }

  redirect(toExpensesCategoryPage(searchParams, categoryId));
}

function toExpensesCategoryPage(searchParams: string, categoryId: number) {
  return searchParams
    ? `/expenses/category/${categoryId}?${searchParams}`
    : `/expenses/categories?month=${dayjs().format("YYYY-MM-DD")}`;
}
