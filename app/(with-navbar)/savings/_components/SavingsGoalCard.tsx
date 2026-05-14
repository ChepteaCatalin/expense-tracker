import { type SavingsGoal } from '@/types/savings';
import { readableCurrency } from '@/utils/currency';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

export default function SavingsGoalCard({
  goal: {
    name,
    currency,
    initialAmount,
    currentAmount,
    targetAmount,
    startDate,
    isCompleted,
    completedDate,
    notes,
  },
}: {
  goal: SavingsGoal;
}) {
  const remaining = targetAmount - currentAmount;

  const formatAmount = formatAmountWithCurrency(currency);

  return (
    <Box
      sx={{
        borderRadius: 3,
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #212121 60%, #1a2e1a 100%)',
        border: '1px solid',
        borderColor: isCompleted ? 'primary.main' : 'rgba(255,255,255,0.08)',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        boxShadow: isCompleted
          ? '0 0 24px rgba(30, 215, 96, 0.15)'
          : '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: isCompleted
            ? '0 0 36px rgba(30, 215, 96, 0.25)'
            : '0 8px 32px rgba(0,0,0,0.6)',
        },
      }}
    >
      <Heading name={name} isCompleted={isCompleted} />
      <Progress
        current={currentAmount}
        target={targetAmount}
        isCompleted={isCompleted}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${initialAmount !== 0 ? 3 : 2}, 1fr)`,
          '@media (pointer: coarse)': {
            gridTemplateColumns: '1fr',
          },
          gap: 1.5,
        }}
      >
        {[
          initialAmount !== 0
            ? {
                label: 'Initial',
                value: formatAmount(initialAmount),
              }
            : null,
          {
            label: 'Current',
            value: formatAmount(currentAmount),
            highlight: true,
          },
          {
            label: 'Target',
            value: formatAmount(targetAmount),
          },
        ]
          .filter(item => item !== null)
          .map(({ label, value, highlight }) => (
            <AmountCard
              key={label}
              label={label}
              value={value}
              highlight={highlight}
            />
          ))}
      </Box>
      {!isCompleted && remaining > 0 && (
        <RemainingAmount remaining={formatAmount(remaining)} />
      )}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <DateRow label="Started" value={startDate} />
        {completedDate && (
          <DateRow label="Completed" value={completedDate} accent />
        )}
      </Box>
      {notes && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontStyle: 'italic',
            bgcolor: 'rgba(255,255,255,0.03)',
            borderRadius: 2,
            px: 2,
            py: 1.25,
            borderLeft: '3px solid',
            borderColor: 'primary.main',
          }}
        >
          {notes}
        </Typography>
      )}
    </Box>
  );
}

function Heading({
  name,
  isCompleted,
}: {
  name: string;
  isCompleted: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          wordBreak: 'break-word',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </Typography>
      <Chip
        label={isCompleted ? 'Completed' : 'In Progress'}
        size="small"
        sx={{
          flexShrink: 0,
          fontWeight: 600,
          bgcolor: isCompleted
            ? 'rgba(30,215,96,0.15)'
            : 'rgba(255,255,255,0.08)',
          color: isCompleted ? 'primary.main' : 'text.secondary',
          border: '1px solid',
          borderColor: isCompleted ? 'primary.main' : 'rgba(255,255,255,0.12)',
        }}
      />
    </Box>
  );
}

function Progress({
  current,
  target,
  isCompleted,
}: {
  current: number;
  target: number;
  isCompleted: boolean;
}) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontWeight: 500 }}
        >
          Progress
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: isCompleted ? 'primary.main' : 'text.primary',
          }}
        >
          {((current / target) * 100).toFixed(2)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={Math.min((current / target) * 100, 100)}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'rgba(255,255,255,0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            background: isCompleted
              ? 'linear-gradient(90deg, #1ED760, #17a348)'
              : 'linear-gradient(90deg, #1ED760, #0ea5e9)',
          },
        }}
      />
    </Box>
  );
}

function AmountCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.04)',
        borderRadius: 2,
        p: 1.5,
        textAlign: 'center',
        border: '1px solid',
        borderColor: highlight
          ? 'rgba(30,215,96,0.2)'
          : 'rgba(255,255,255,0.06)',
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '0.95rem',
          color: highlight ? 'primary.main' : 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function RemainingAmount({ remaining }: { remaining: string }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.primary', fontWeight: 600 }}
      >
        {remaining}{' '}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        remaining to reach your goal
      </Typography>
    </Box>
  );
}

function DateRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: Date;
  accent?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: accent ? 'primary.main' : 'text.primary',
        }}
      >
        {dayjs(value).format('D MMMM YYYY')}
      </Typography>
    </Box>
  );
}

function formatAmountWithCurrency(currency: string) {
  return (amountInCents: number) =>
    `${readableCurrency(amountInCents)} ${currency}`;
}
