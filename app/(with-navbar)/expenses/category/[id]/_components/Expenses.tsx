import { ExpensesByCategorySearchParams, SortExpenseBy } from '@/types/expense';
import { validSearchParams } from '../../../_utils/url';
import { validIdParam } from '@/utils/url';
import { notFound } from 'next/navigation';

export default async function Expenses({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  const awaitedSearchParams = await searchParams;

  if (
    !validSearchParams(awaitedSearchParams) ||
    !validIdParam((await params).id) ||
    !validSortBySearchParam(awaitedSearchParams.sortBy as SortExpenseBy)
  ) {
    notFound();
  }

  return <div>Expenses List</div>;
}

function validSortBySearchParam(sortBy: SortExpenseBy) {
  return sortBy === 'date' || sortBy === 'amount';
}
