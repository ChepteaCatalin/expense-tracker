'use server';

import {
  TransactionFormErrors,
  TransactionFormValues,
} from '@/types/transaction';
import { transactionSchema } from '@/utils/validation';
import { createIncome as createNewIncome } from '@/data/income';
import { toCents } from '@/utils/currency';
import { getFormErrors } from '@/lib/zod';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { UnauthorizedError } from '@/utils/error';

export async function createIncome(
  searchParams: string,
  _: TransactionFormErrors,
  income: TransactionFormValues,
): Promise<TransactionFormErrors> {
  const errors = getFormErrors(transactionSchema, income);
  if (errors) return errors;

  try {
    await createNewIncome({
      ...income,
      amount: toCents(income.amount),
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return { api: 'Failed to add the income' };
  }

  if (searchParams.includes('sortBy')) {
    redirect(toIncomesCategoryPage(searchParams, +income.categoryId));
  } else {
    redirect(
      searchParams
        ? `/incomes/categories?${searchParams}`
        : `/incomes/categories?month=${dayjs().format('YYYY-MM-DD')}`,
    );
  }
}

// FIXME: test this
function toIncomesCategoryPage(searchParams: string, categoryId: number) {
  return searchParams
    ? `/incomes/category/${categoryId}?${searchParams}`
    : `/incomes/categories?month=${dayjs().format('YYYY-MM-DD')}`;
}
