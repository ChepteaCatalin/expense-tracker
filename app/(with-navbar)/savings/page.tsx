import Fab from '@/components/Fab';
import Stack from '@mui/material/Stack';
import Link from 'next/dist/client/link';
import SavingsGoalCard from './_components/SavingsGoalCard';

export default function SavingsPage() {
  return (
    <Stack spacing={3}>
      <SavingsGoalCard
        goal={{
          id: 1,
          name: 'Sample Savings Goal',
          initialAmount: 50000,
          currentAmount: 43256,
          targetAmount: 100000,
          note: 'This is a sample savings goal for demonstration purposes.',
          startDate: new Date('2024-01-01'),
          // completedDate: new Date('2026-05-15'),
        }}
      />
      <SavingsGoalCard
        goal={{
          id: 1,
          name: 'Completed',
          initialAmount: 100000,
          currentAmount: 1_000_000,
          targetAmount: 100000,
          startDate: new Date('2024-01-01'),
          completedDate: new Date('2026-05-15'),
        }}
      />
      {/* TODO: implement this navigation */}
      <Link href="/savings/goals/new">
        <Fab />
      </Link>
    </Stack>
  );
}
