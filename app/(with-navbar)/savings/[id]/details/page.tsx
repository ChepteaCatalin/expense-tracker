import { notFound, redirect } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import type { SavingsGoal } from '@/types/savings';
import { UnauthorizedError } from '@/utils/error';
import { getSavingsGoalById } from '@/data/savings';
import Stack from '@mui/material/Stack';
import SavingsGoalCard from '../../_components/SavingsGoalCard';
import ActionsButtons from './_components/ActionsButtons';
import { BackToSavingsLink } from '../../_components/BackToSavingsLink';

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
        <ActionsButtons goal={goal} />
      </Stack>
    </>
  );
}
