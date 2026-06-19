import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import type {
  DashboardSearchParams,
  SavingsChartData,
} from '@/types/dashboard';
import { getSession } from '@/data/auth';
import SavingsChart from './SavingsChart';
import { getSavingsChartData } from '@/data/dashboard';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import NoData from '../_components/NoData';

export default async function SavingsPage({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: SavingsChartData;
  try {
    chartData = await getSavingsChartData({
      from: params.from!,
      to: params.to!,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect('/signin');
    throw error;
  }
  const currency = (await getSession())?.user.currency;

  if (chartData.data.every(d => !d)) {
    return (
      <NoData
        title="Savings"
        link={{ href: '/savings', text: 'Add Savings' }}
      />
    );
  }

  return (
    <InsightCard title={`Savings (${currency})`}>
      <SavingsChart chartData={chartData} />
    </InsightCard>
  );
}
