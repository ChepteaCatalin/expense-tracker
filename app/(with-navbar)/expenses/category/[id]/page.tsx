import SortBy from './_components/SortBy';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';
import BackToCategoriesBtn from './_components/BackToCategoriesBtn';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ExpensesList from './_components/Expenses';
import { ExpensesByCategorySearchParams } from '@/types/expense';

export default function ExpensesCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{
                width: '66px',
                height: '28px',
                borderRadius: '4px',
              }}
            />
          }
        >
          <BackToCategoriesBtn />
        </Suspense>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{ width: '205px', height: '40px', borderRadius: '4px' }}
            />
          }
        >
          <SortBy />
        </Suspense>
      </Grid>
      <Suspense fallback="LOADING///">
        <ExpensesList params={params} searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
