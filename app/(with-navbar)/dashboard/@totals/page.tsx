import Typography from '@mui/material/Typography';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams } from '@/types/dashboard';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { getSession } from '@/data/auth';
import { readableCurrency } from '@/utils/currency';

export default async function Totals({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  //TODO: do this after fetching data
  const currency = (await getSession())?.user.currency;

  const totals = {
    income: 1_234_56700.99,
    expenses: 1_234_56700.99,
    savings: 1_234_56700.99,
  };

  const netIncome = totals.income - totals.expenses;

  return (
    <InsightCard title={`Totals (${currency})`}>
      <MetricRow label="Income" value={totals.income} color="success.main" />
      <Divider sx={dividerSx} />
      <MetricRow label="Expenses" value={totals.expenses} color="error.main" />
      <Divider sx={dividerSx} />
      <MetricRow
        label="Net Income"
        value={netIncome}
        color={netIncome >= 0 ? 'success.main' : 'error.main'}
        highlight
      />
      <Divider sx={dividerSx} />
      <MetricRow label="Savings" value={totals.savings} color="info.main" />
    </InsightCard>
  );
}

function MetricRow({
  label,
  value,
  color,
  highlight,
}: {
  label: string;
  value: number;
  color: string;
  highlight?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: highlight ? 1 : 0,
        py: highlight ? 0.5 : 0,
        borderRadius: highlight ? 1 : 0,
        bgcolor: highlight ? 'rgba(255,255,255,0.04)' : 'transparent',
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: highlight ? 700 : 600, color }}
      >
        {readableCurrency(value)}
      </Typography>
    </Box>
  );
}

const dividerSx = { my: 1, borderColor: 'rgba(255,255,255,0.07)' };
