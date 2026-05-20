import Fab from '@/components/Fab';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import SavingsGoalCard from './_components/SavingsGoalCard';
import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import { getAllSavingsGoals } from '@/data/savings';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import type { SavingsGoal } from '@/types/savings';
import NoSavingsGoals from './_components/NoSavingsGoals';
import { metadata } from './constants';

export { metadata };

export default async function SavingsPage() {
  let savingsGoals: SavingsGoal[] = [];
  try {
    savingsGoals = await getAllSavingsGoals();
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      <Stack spacing={3}>
        {savingsGoals.length ? (
          savingsGoals.map(goal => (
            <SavingsGoalCard key={goal.id} goal={goal} />
          ))
        ) : (
          <NoSavingsGoals />
        )}
        <Link href="/savings/new">
          <Fab />
        </Link>
      </Stack>
    </Box>
  );
}
