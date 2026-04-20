import { ExpensesByCategorySearchParams, SortExpenseBy } from '@/types/expense';
import { validSearchParams } from '../../_utils/url';
import { notFound } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import Box from '@mui/material/Box';
import SortBy from '../../_components/SortBy';

export default async function ExpensesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  if (
    !validSearchParams(resolvedSearchParams) ||
    !validIdParam((await params).id) ||
    !validSortBySearchParam(resolvedSearchParams.sortBy as SortExpenseBy)
  ) {
    notFound();
  }

  return (
    <Box>
      <SortBy />
    </Box>
  );
}

function validSortBySearchParam(sortBy: SortExpenseBy) {
  return sortBy === 'date' || sortBy === 'amount';
}
