import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams } from '@/types/dashboard';
import IncomeVsExpensesChart from './chart';
import { getSession } from '@/data/auth';

export default async function NetIncomePage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  // TODO: do this after fetching
  const currency = (await getSession())?.user.currency;

  return (
    <InsightCard title={`Net Income (${currency})`}>
      <IncomeVsExpensesChart />
    </InsightCard>
  );
}
