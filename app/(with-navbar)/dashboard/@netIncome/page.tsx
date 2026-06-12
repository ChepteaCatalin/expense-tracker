import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams, MonthlyMetric } from '@/types/dashboard';
import NetIncomeChart from './NetIncomeChart';
import { getSession } from '@/data/auth';
import { getMonthlyMetrics } from '@/data/dashboard';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import { fromCents } from '@/utils/currency';

export default async function NetIncomePage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var metrics: MonthlyMetric[];
  try {
    metrics = await getMonthlyMetrics({
      from: params.from!,
      to: params.to!,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect('/signin');
    throw error;
  }
  const currency = (await getSession())?.user.currency;

  const chartData = {
    months: metrics.map(m => m.month),
    income: metrics.map(m => fromCents(m.income)),
    expenses: metrics.map(m => fromCents(m.expenses)),
    netIncome: metrics.map(m => fromCents(m.netIncome)),
  };

  return (
    <InsightCard title={`Net Income (${currency})`}>
      <NetIncomeChart data={chartData} />
    </InsightCard>
  );
}
