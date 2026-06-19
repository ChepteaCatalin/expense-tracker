import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type { DashboardSearchParams } from '@/types/dashboard';
import { getSession } from '@/data/auth';
import SavingsChart from './SavingsChart';

export default async function SavingsPage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  //TODO: do this after fetching
  const currency = (await getSession())?.user.currency;

  return (
    <InsightCard title={`Savings (${currency})`}>
      <SavingsChart />
    </InsightCard>
  );
}
