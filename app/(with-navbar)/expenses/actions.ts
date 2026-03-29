'use server';

import { getFormErrors } from '@/lib/zod';
import { ExpenseFormErrors, ExpenseFormValues } from '@/types/expense';
import { expenseSchema } from './validation';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import { createExpense as createNewExpense } from '@/data/expense';
import { toCents } from '@/utils/currency';

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

  redirect('/expenses/categories?period=day');
}
