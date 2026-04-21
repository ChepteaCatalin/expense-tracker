import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import BackToExpenseCategoriesBtn from './_components/BackToExpenseCategoriesBtn';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const metadata = {
  title: 'New Expense',
  description: 'Add a new expense to your tracker',
};

export default function NewExpenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{
                width: '260px',
                height: '28px',
                mb: 0.5,
                borderRadius: '4px',
              }}
            />
          }
        >
          <BackToExpenseCategoriesBtn />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
