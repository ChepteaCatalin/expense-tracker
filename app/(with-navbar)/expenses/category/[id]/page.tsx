import { ExpenseCategoriesSearchParams } from '@/types/expense';
import { validSearchParams } from '../../_utils/url';
import { notFound } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import Box from '@mui/material/Box';

export default async function ExpensesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpenseCategoriesSearchParams>;
}) {
  if (
    !validSearchParams(await searchParams) ||
    !validIdParam((await params).id)
  ) {
    notFound();
  }

  return <Box></Box>;
}
