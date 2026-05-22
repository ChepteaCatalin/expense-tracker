import { notFound, redirect } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import type { SavingsGoal } from '@/types/savings';
import { UnauthorizedError } from '@/utils/error';
import { getSavingsGoalById } from '@/data/savings';
import Heading from '@/components/Heading';
import Stack from '@mui/material/Stack';
import SavingsGoalCard from '../../_components/SavingsGoalCard';
import ActionsButtons from './_components/ActionsButtons';
import { BackToSavingsLink } from '../../_components/BackToSavingsLink';
import PageWrapper from '@/components/PageWrapper';

export const metadata = {
  title: 'Goal Details',
  description: 'Progress and details for your savings goal',
};

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
    <PageWrapper>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      <BackToSavingsLink />
      <Stack spacing={3}>
        <SavingsGoalCard goal={goal} />
        <ActionsButtons id={goal.id} name={goal.name} />
      </Stack>
    </PageWrapper>
  );
}
