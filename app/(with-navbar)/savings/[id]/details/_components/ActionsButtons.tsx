import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteSavingsGoalBtn from './DeleteSavingsGoalBtn';
import Link from 'next/link';
import AddDepositBtn from './AddDepositBtn';
import type { SavingsGoal } from '@/types/savings';
import CompleteGoalBtn from './CompleteGoalBtn';
import ReopenGoalBtn from './ReopenGoalBtn';

export default function ActionsButtons({ goal }: { goal: SavingsGoal }) {
  return (
    <Box
      sx={{
        p: 2,
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
        sx={{ mb: 2, fontWeight: 600 }}
      >
        Goal Actions
      </Typography>
      <Grid container spacing={1.5}>
        <Grid container spacing={1.5} sx={{ flex: 1 }}>
          <AddDepositBtn
            id={goal.id}
            currency={goal.currency}
            disabled={goal.isCompleted}
          />
          {goal.isCompleted ? (
            <ReopenGoalBtn id={goal.id} />
          ) : (
            <CompleteGoalBtn id={goal.id} />
          )}
        </Grid>
        <Grid container spacing={1.5} sx={{ flex: 1 }}>
          {goal.isCompleted ? (
            <Box sx={{ width: '100%' }}>
              <EditGoalBtn disabled />
            </Box>
          ) : (
            <Link href={`/savings/${goal.id}/edit`} style={{ width: '100%' }}>
              <EditGoalBtn />
            </Link>
          )}
          <DeleteSavingsGoalBtn
            id={goal.id}
            name={goal.name}
            disabled={goal.isCompleted}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function EditGoalBtn({ disabled }: { disabled?: boolean }) {
  return (
    <Button
      variant="outlined"
      startIcon={<EditIcon />}
      fullWidth
      disabled={disabled}
    >
      Edit Goal
    </Button>
  );
}
