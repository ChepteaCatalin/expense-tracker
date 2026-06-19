import Typography from '@mui/material/Typography';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams, TotalsMetrics } from '@/types/dashboard';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { getSession } from '@/data/auth';
import { readableCurrency } from '@/utils/currency';
import { getTotals } from '@/data/dashboard';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import NoData from '../_components/NoData';
import AddExpensesLinkBtn from '../_components/AddExpensesLinkBtn';

export default async function TotalsPage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var totals: TotalsMetrics;
  try {
    totals = await getTotals({
      from: params.from!,
      to: params.to!,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect('/signin');
    throw error;
  }
  const currency = (await getSession())?.user.currency;

  const netIncome = totals.income - totals.expenses;

  if (
    totals.income === 0 &&
    totals.expenses === 0 &&
    totals.savingsByCurrency?.length === 0
  ) {
    return <NoData title="Totals" customLink={<AddExpensesLinkBtn />} />;
  }

  return (
    <InsightCard title="Totals">
      <MetricRow
        label="Income"
        value={totals.income}
        currency={currency}
        color="success.main"
      />
      <Divider sx={dividerSx} />
      <MetricRow
        label="Expenses"
        value={totals.expenses}
        currency={currency}
        color="error.main"
      />
      <Divider sx={dividerSx} />
      <MetricRow
        label="Net Income"
        value={netIncome}
        currency={currency}
        color={netIncome >= 0 ? 'success.main' : 'error.main'}
        highlight
      />
      <Divider sx={dividerSx} />
      {totals.savingsByCurrency.length === 0 ? (
        <MetricRow label="Savings" value={0} color="info.main" />
      ) : (
        totals.savingsByCurrency.map(({ currency, total }) => (
          <MetricRow
            key={currency}
            label="Savings"
            value={total}
            currency={currency}
            color="info.main"
          />
        ))
      )}
    </InsightCard>
  );
}

function MetricRow({
  label,
  value,
  currency,
  color,
  highlight,
}: {
  label: string;
  value: number;
  currency?: string;
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
        {readableCurrency(value)} {currency ?? ''}
      </Typography>
    </Box>
  );
}

const dividerSx = { my: 1, borderColor: 'rgba(255,255,255,0.07)' };
