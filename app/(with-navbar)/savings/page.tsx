import Fab from '@/components/Fab';
import Stack from '@mui/material/Stack';
import Link from 'next/dist/client/link';
import SavingsGoalCard from './_components/SavingsGoalCard';
import Heading from '@/components/Heading';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Savings',
  description: 'Set goals and watch your wealth grow',
};

export default function SavingsPage() {
  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
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
            currency: 'USD',
            isCompleted: false,
            // completedDate: new Date('2026-05-15'),
          }}
        />
        <SavingsGoalCard
          goal={{
            id: 1,
            name: 'Completed',
            initialAmount: 1000,
            currentAmount: 123000,
            targetAmount: 100000,
            startDate: new Date('2024-01-01'),
            isCompleted: true,
            completedDate: new Date('2026-05-15'),
            currency: 'EUR',
          }}
        />
        <Link href="/savings/new">
          <Fab />
        </Link>
      </Stack>
    </Box>
  );
}
