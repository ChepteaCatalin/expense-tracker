import type { DashboardSearchParams } from '@/types/dashboard';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import ExpensesBreakdownChart from './ExpensesBreakdownChart';
import { getSession } from '@/data/auth';

export default async function ExpensesBreakdown({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  //TODO: do this after fetching data
  const currency = (await getSession())?.user.currency;

  return (
    <InsightCard title={`Expenses Breakdown (${currency})`}>
      <ExpensesBreakdownChart />
    </InsightCard>
  );
}
