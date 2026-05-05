import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import FormNavigateBackBtn from '../_components/FormNavigateBackBtn';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const metadata = {
  title: 'New Income',
  description: 'Add a new income to your tracker',
};

export default function NewIncomeLayout({
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
                width: '66px',
                height: '28px',
                mb: 0.5,
                borderRadius: '4px',
              }}
            />
          }
        >
          <FormNavigateBackBtn />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}
