'use server';

import { getFormErrors } from '@/lib/zod';
import {
  ExpenseFormValuesWithId,
  ExpenseFormErrors,
  ExpenseFormValues,
} from '@/types/expense';
import { expenseSchema } from './validation';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import {
  createExpense as createNewExpense,
  updateExpense as updateExistingExpense,
  deleteExpense as deleteExistingExpense,
} from '@/data/expense';
import { toCents } from '@/utils/currency';
import dayjs from 'dayjs';

export async function createExpense(
  _: ExpenseFormErrors,
  expense: ExpenseFormValues,
): Promise<ExpenseFormErrors> {
  const errors = getFormErrors(expenseSchema, expense);
  if (errors) return errors;

  try {
    await createNewExpense({
      ...expense,
      amount: toCents(expense.amount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return { api: 'Failed to add the expense' };
  }

  redirect(`/expenses/categories?day=${dayjs().format('YYYY-MM-DD')}`);
}

export async function updateExpense(
  _: ExpenseFormErrors,
  expense: ExpenseFormValuesWithId,
): Promise<ExpenseFormErrors> {
  const errors = getFormErrors(expenseSchema, {
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
    if (err instanceof UnauthorizedError) redirect('/signin');
    return { api: 'Failed to edit the expense' };
  }

  redirect(`/expenses/categories?day=${dayjs().format('YYYY-MM-DD')}`);
}

export async function deleteExpense(_: string, { id }: { id: number }) {
  try {
    await deleteExistingExpense(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return 'Failed to delete expense';
  }

  redirect(`/expenses/categories?day=${dayjs().format('YYYY-MM-DD')}`);
}
