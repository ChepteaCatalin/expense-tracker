import { Suspense } from 'react';
import Box from '@mui/material/Box';
import ExpensesList from './_components/ExpensesList';
import { ExpensesByCategorySearchParams } from '@/types/expense';
import Overview from './_components/Overview';
import Heading from './_components/Heading';
import Skeleton from '@mui/material/Skeleton';

export default function ExpensesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  return (
    <Box sx={{ pb: 3 }}>
      <Heading />
      <Suspense
        fallback={
          <Skeleton
            variant="rectangular"
            width="100%"
            height={209}
            sx={{ borderRadius: '12px' }}
          />
        }
      >
        <Overview params={params} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback="LOADING///">
        <ExpensesList params={params} searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
