import Box from '@mui/material/Box';
import Heading from '@/components/Heading';
import PeriodsTabs from '@/components/transactions/PeriodsTabs';
import { Suspense } from 'react';
import PeriodTabsFallback from '@/components/transactions/form/PeriodTabsFallback';

export const metadata = {
  title: 'Income',
  description: 'Track and organize your income',
};

export default function IncomeCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Suspense fallback={<PeriodTabsFallback />}>
        <PeriodsTabs type="incomes" />
      </Suspense>
      {children}
    </Box>
  );
}
