import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams } from '@/types/dashboard';

export default async function IncomeVsExpensesPage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  return <InsightCard title="Income vs Expenses">123</InsightCard>;
}
