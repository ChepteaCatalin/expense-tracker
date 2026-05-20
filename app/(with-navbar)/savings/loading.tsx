import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { metadata } from './constants';
import Skeleton from '@mui/material/Skeleton';

export default function SavingsGoalsLoading() {
  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      <Stack spacing={3}>
        <SavingsGoalCard />
        <SavingsGoalCard />
      </Stack>
    </Box>
  );
}

function SavingsGoalCard() {
  return (
    <Skeleton
      variant="rectangular"
      height={331}
      sx={{ borderRadius: '12px' }}
    />
  );
}
