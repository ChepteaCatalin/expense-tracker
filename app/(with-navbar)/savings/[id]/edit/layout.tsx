import TitledCardPageWrapper from '@/components/TitledCardPageWrapper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
  title: 'Edit Goal',
  description: 'Edit an existing savings goal',
};

export default async function EditSavingsGoalLayout({
  params,
  children,
}: LayoutProps<'/savings/[id]/edit'>) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              height="28px"
              sx={{ borderRadius: '4px', width: '182px', mb: 0.5 }}
            />
          }
        >
          <SavingsGoalDetailsLink params={params} />
        </Suspense>
      }
    >
      {children}
    </TitledCardPageWrapper>
  );
}

async function SavingsGoalDetailsLink({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Link href={`/savings/${id}/details`}>
      <Button
        sx={{
          py: 0,
          px: 0.5,
          '& .MuiButton-startIcon': { mr: 0.5 },
          mb: 0.5,
        }}
        startIcon={<ChevronLeftIcon />}
      >
        Goal Details
      </Button>
    </Link>
  );
}
