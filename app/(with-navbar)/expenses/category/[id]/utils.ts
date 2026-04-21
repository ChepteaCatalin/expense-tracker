import { notFound } from 'next/navigation';
import { validSearchParams } from '../../_utils/url';
import { validIdParam } from '@/utils/url';
import type {
  ExpensesByCategorySearchParams,
  SortExpenseBy,
} from '@/types/expense';

export function validateParams(
  params: { id: string },
  searchParams: ExpensesByCategorySearchParams,
) {
  if (
    !validSearchParams(searchParams) ||
    !validIdParam(params.id) ||
    !validSortBySearchParam(searchParams.sortBy as SortExpenseBy)
  ) {
    notFound();
  }
}

function validSortBySearchParam(sortBy: SortExpenseBy) {
  return sortBy === 'date' || sortBy === 'amount';
}
