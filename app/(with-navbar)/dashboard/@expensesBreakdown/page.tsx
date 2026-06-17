import type { DashboardSearchParams } from '@/types/dashboard';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import ExpensesBreakdownChart from './ExpensesBreakdownChart';

export default async function ExpensesBreakdown({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  return (
    <InsightCard title="Expenses Breakdown">
      <ExpensesBreakdownChart />
    </InsightCard>
  );
}
