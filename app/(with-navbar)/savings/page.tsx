import Fab from '@/components/Fab';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import SavingsGoalCard from './_components/SavingsGoalCard';
import Heading from '@/components/Heading';
import { getAllSavingsGoals } from '@/data/savings';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import type { SavingsGoal } from '@/types/savings';
import NoSavingsGoals from './_components/NoSavingsGoals';
import { metadata } from './constants';
import PageWrapper from '@/components/PageWrapper';

export { metadata };

export default async function SavingsPage() {
  let savingsGoals: SavingsGoal[] = [];
  try {
    savingsGoals = await getAllSavingsGoals();
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  return (
    <PageWrapper>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      <Stack spacing={3}>
        {savingsGoals.length ? (
          savingsGoals.map(goal => (
            <Link
              key={goal.id}
              href={`/savings/${goal.id}/details`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <SavingsGoalCard goal={goal} />
            </Link>
          ))
        ) : (
          <NoSavingsGoals />
        )}
        <Link href="/savings/new">
          <Fab />
        </Link>
      </Stack>
    </PageWrapper>
  );
}
