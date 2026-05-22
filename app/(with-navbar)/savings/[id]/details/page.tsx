import { notFound, redirect } from 'next/navigation';
import { validIdParam } from '@/utils/url';
import type { SavingsGoal } from '@/types/savings';
import { UnauthorizedError } from '@/utils/error';
import { getSavingsGoalById } from '@/data/savings';
import Box from '@mui/material/Box';
import Heading from '@/components/Heading';
import Stack from '@mui/material/Stack';
import SavingsGoalCard from '../../_components/SavingsGoalCard';
import ActionsButtons from './_components/ActionsButtons';

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
  }

  if (!goal) notFound();

  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      <Stack spacing={3}>
        <SavingsGoalCard goal={goal} />
        <ActionsButtons />
      </Stack>
    </Box>
  );
}
