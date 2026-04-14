import Fab from '@/components/Fab';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Heading from '@/components/Heading';
import PeriodsTabs from '../_components/PeriodsTabs';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const metadata = {
  title: 'Expenses',
  description: 'Track and organize your spending',
};

export default function ExpenseCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Suspense fallback={<PeriodTabsFallback />}>
        <PeriodsTabs />
      </Suspense>
      {children}
      <Link href="/expenses/new">
        <Fab />
      </Link>
    </Box>
  );
}

function PeriodTabsFallback() {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        height: '32px',
        mt: -1,
        mb: 1.5,
        borderRadius: '4px',
        width: '350px',
        mx: 'auto',
      }}
    />
  );
}
