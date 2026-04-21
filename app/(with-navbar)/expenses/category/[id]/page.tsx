import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Expenses from './_components/Expenses';
import { ExpensesByCategorySearchParams } from '@/types/expense';
import Overview from './_components/Overview';
import Heading from './_components/Heading';

export default function ExpensesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  return (
    <Box>
      <Heading />
      <Suspense fallback="LOADING///">
        <Overview params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback="LOADING///">
        <Expenses params={params} searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
