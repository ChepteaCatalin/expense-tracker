import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';
import BackToCategoriesBtn from '@/components/transactions/BackToCategoriesBtn';
import SortBy from '@/components/transactions/SortBy';

export default function Heading({ type }: { type: 'incomes' | 'expenses' }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.25,
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
        <BackToCategoriesBtn type={type} />
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
  );
}
