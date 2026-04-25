import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import NavigateBackBtn from '@/components/NavigateBackBtn';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const metadata = {
  title: 'Edit Expense',
  description: 'Edit an existing expense',
};

export default function EditExpenseLayout({
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
          <NavigateBackBtn />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
