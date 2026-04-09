import { ExpenseCategoriesSearchParams } from '@/types/expense';
import { validSearchParams } from '../../_utils/url';
import { notFound } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Fab from '@/components/Fab';

export default async function ExpenseCategoryPage({
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

  return (
    <Box>
      <Link href="/expenses/new">
        <Fab />
      </Link>
    </Box>
  );
}
