import type { DashboardSearchParams } from '@/types/dashboard';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';

export default async function ExpensesBreakdown({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  return (
    <InsightCard title="Expenses Breakdown">
      <div>123</div>
    </InsightCard>
  );
}
