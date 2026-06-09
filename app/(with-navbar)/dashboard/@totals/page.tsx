import Typography from '@mui/material/Typography';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams } from '@/types/dashboard';
import Box from '@mui/material/Box';
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

  return (
    <InsightCard title={`Totals (${currency})`}>
      <MetricRow label="Total Income" value={totals.income} />
      <MetricRow label="Total Expenses" value={totals.expenses} />
      <MetricRow label="Net Income" value={totals.income - totals.expenses} />
      <MetricRow label="Total Savings" value={totals.savings} />
    </InsightCard>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <Box>
      <Typography component="span" sx={{ fontWeight: 600 }}>
        {label}:{' '}
      </Typography>
      <Typography component="span">{readableCurrency(value)}</Typography>
    </Box>
  );
}
