import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteSavingsGoalBtn from './DeleteSavingsGoalBtn';
import Link from 'next/link';
import AddDepositBtn from './AddDepositBtn';
import type { SavingsGoal } from '@/types/savings';

export default function ActionsButtons({ goal }: { goal: SavingsGoal }) {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(145deg, color-mix(in srgb, var(--mui-palette-primary-main) 4%, transparent), transparent 65%)',
      }}
    >
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ mb: 0.5, fontWeight: 600 }}
      >
        Goal Actions
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Keep this goal moving or remove it if you no longer need it.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <AddDepositBtn id={goal.id} currency={goal.currency} />
        <Link href={`/savings/${goal.id}/edit`} style={{ width: '100%' }}>
          <Button variant="outlined" startIcon={<EditIcon />} fullWidth>
            Edit Goal
          </Button>
        </Link>
        <DeleteSavingsGoalBtn id={goal.id} name={goal.name} />
      </Stack>
    </Box>
  );
}
