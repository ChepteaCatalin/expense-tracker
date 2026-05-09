import { notFound } from 'next/navigation';
import { validSearchParams } from '@/utils/transactions/url';
import { validIdParam } from '@/utils/url';
import type {
  TransactionByCategorySearchParams,
  SortTransactionBy,
} from '@/types/transaction';

export function validateParams(
  params: { id: string },
  searchParams: TransactionByCategorySearchParams,
) {
  if (
    !validSearchParams(searchParams) ||
    !validIdParam(params.id) ||
    !validSortBySearchParam(searchParams.sortBy as SortTransactionBy)
  ) {
    notFound();
  }
}

function validSortBySearchParam(sortBy: SortTransactionBy) {
  return sortBy === 'date' || sortBy === 'amount';
}
