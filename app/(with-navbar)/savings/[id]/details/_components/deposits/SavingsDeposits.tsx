import type { SavingsDeposit } from '@/types/savings';
import { readableCurrency } from '@/utils/currency';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import NoSavingsDeposits from './NoSavingsDeposits';
import IconButton from '@mui/material/IconButton';
import AddDepositIconBtn from './AddDepositIconBtn';

export default async function SavingsDeposits({
  deposits,
  isGoalCompleted,
  goalId,
  goalCurrency,
}: {
  deposits: SavingsDeposit[];
  isGoalCompleted: boolean;
  goalCurrency: string;
  goalId: number;
}) {
  if (!deposits.length)
    return (
      <NoSavingsDeposits
        goalId={goalId}
        goalCurrency={goalCurrency}
        isGoalCompleted={isGoalCompleted}
      />
    );

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.12)',
        background:
          'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 45%, rgba(20,120,80,0.08) 100%)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack spacing={0.5} direction="row" sx={{ alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Deposits
              </Typography>
              <AddDepositIconBtn
                id={goalId}
                isGoalCompleted={isGoalCompleted}
                goalCurrency={goalCurrency}
              />
            </Stack>
            <Chip
              label={`${deposits.length} ${deposits.length === 1 ? 'entry' : 'entries'}`}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            />
          </Stack>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <Stats deposits={deposits} currency={goalCurrency} />
          <Stack spacing={1.25}>
            {deposits.map(deposit => (
              <Stack
                key={deposit.id}
                spacing={0.5}
                sx={{
                  borderRadius: 2,
                  px: 1.5,
                  py: 1.25,
                  pr: 0.875,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background:
                    'linear-gradient(125deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.25,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                    }}
                  >
                    +{readableCurrency(deposit.amount)} {goalCurrency}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        borderRight: '1px solid rgba(255,255,255,0.3)',
                        pr: 1.125,
                      }}
                    >
                      {dayjs(deposit.date).format('D MMM YYYY')}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label="edit"
                      disabled={isGoalCompleted}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="delete"
                      disabled={isGoalCompleted}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
                {deposit.notes && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {deposit.notes}
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function Stats({
  deposits,
  currency,
}: {
  deposits: SavingsDeposit[];
  currency: string;
}) {
  const totalAmount = deposits.reduce(
    (sum, deposit) => sum + deposit.amount,
    0,
  );
  const avgAmount = totalAmount / deposits.length;
  const minDeposit = deposits.reduce((min, deposit) =>
    deposit.amount < min.amount ? deposit : min,
  );
  const maxDeposit = deposits.reduce((max, deposit) =>
    deposit.amount > max.amount ? deposit : max,
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 1.25,
        '@media (max-width: 700px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      <StatCard
        label="Average"
        value={readableCurrency(avgAmount)}
        currency={currency}
      />
      <StatCard
        label="Minimum"
        value={readableCurrency(minDeposit.amount)}
        date={minDeposit.date}
        currency={currency}
      />
      <StatCard
        label="Maximum"
        value={readableCurrency(maxDeposit.amount)}
        date={maxDeposit.date}
        currency={currency}
      />
    </Box>
  );
}

function StatCard({
  label,
  value,
  date,
  currency,
}: {
  label: string;
  value: string;
  date?: Date;
  currency: string;
}) {
  return (
    <Stack
      spacing={0.4}
      sx={{
        borderRadius: 2,
        px: 1.25,
        py: 1,
        border: '1px solid rgba(255,255,255,0.12)',
        background:
          'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
        {value} {currency}
      </Typography>
      {date && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {dayjs(date).format('D MMM YYYY')}
        </Typography>
      )}
    </Stack>
  );
}
