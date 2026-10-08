"use server";

import {
  type TransactionFormErrors,
  type TransactionFormValues,
  type TransactionFormValuesWithId,
} from "@/types/transaction";
import { transactionSchema } from "@/utils/validation";
import {
  createIncome as createNewIncome,
  updateIncome as updateExistingIncome,
  deleteIncome as deleteExistingIncome,
} from "@/data/income";
import { toCents } from "@/utils/currency";
import { parseForm } from "@/lib/zod";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { UnauthorizedError } from "@/utils/error";

export async function createIncome(
  searchParams: string,
  _: TransactionFormErrors,
  income: TransactionFormValues,
): Promise<TransactionFormErrors> {
  const result = parseForm(transactionSchema, income);
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await createNewIncome({
      ...income,
      ...data,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to add the income" };
  }

  if (searchParams.includes("sortBy")) {
    redirect(toIncomesCategoryPage(searchParams, data.categoryId));
  } else {
    redirect(
      searchParams
        ? `/incomes/categories?${searchParams}`
        : `/incomes/categories?month=${format(new Date(), "yyyy-MM-dd")}`,
    );
  }
}

export async function updateIncome(
  searchParams: string,
  _: TransactionFormErrors,
  income: TransactionFormValuesWithId,
): Promise<TransactionFormErrors> {
  const result = parseForm(transactionSchema, {
    ...income,
    amount: +income.amount,
    categoryId: +income.categoryId,
    date: String(income.date),
  });
  if (!result.success) return result.errors;
  const { data } = result;

  try {
    await updateExistingIncome({
      ...income,
      ...data,
      amount: toCents(data.amount),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to edit the income" };
  }

  redirect(toIncomesCategoryPage(searchParams, data.categoryId));
}

export async function deleteIncome(
  searchParams: string,
  _: string,
  { id }: { id: number },
): Promise<string> {
  try {
    var { categoryId } = await deleteExistingIncome(id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return "Failed to delete income";
  }

  redirect(toIncomesCategoryPage(searchParams, categoryId));
}

function toIncomesCategoryPage(searchParams: string, categoryId: number) {
  return searchParams
    ? `/incomes/category/${categoryId}?${searchParams}`
    : `/incomes/categories?month=${format(new Date(), "yyyy-MM-dd")}`;
}
