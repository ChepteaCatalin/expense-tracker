import { notFound, redirect } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import type { SavingsGoal } from '@/types/savings';
import { UnauthorizedError } from '@/utils/error';
import { getSavingsGoalById } from '@/data/savings';
import Stack from '@mui/material/Stack';
import SavingsGoalCard from '../../_components/SavingsGoalCard';
import ActionsButtons from './_components/ActionsButtons';
import { BackToSavingsLink } from '../../_components/BackToSavingsLink';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export default async function SavingsGoalDetailsPage({
  params,
}: PageProps<'/savings/[id]/details'>) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  let goal: SavingsGoal | null = null;
  try {
    goal = await getSavingsGoalById(+id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  if (!goal) notFound();

  return (
    <>
      <BackToSavingsLink />
      <Stack spacing={3}>
        <SavingsGoalCard goal={goal} />
        <Suspense fallback={<ActionsButtonsFallback />}>
          <ActionsButtons id={goal.id} name={goal.name} />
        </Suspense>
      </Stack>
    </>
  );
}

function ActionsButtonsFallback() {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={150}
      sx={{ borderRadius: 3 }}
    />
  );
}
