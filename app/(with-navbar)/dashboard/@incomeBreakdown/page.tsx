import type {
  DashboardSearchParams,
  BreakdownChartData,
} from '@/types/dashboard';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import { getSession } from '@/data/auth';
import { getIncomeCategoryBreakdown } from '@/data/dashboard';
import { redirect } from 'next/navigation';
import { UnauthorizedError } from '@/utils/error';
import CategoryBreakdownChart from '../_components/CategoryBreakdownChart';
import AddIncomeLinkBtn from '../_components/AddIncomeLinkBtn';
import NoData from '../_components/NoData';

export default async function IncomeBreakdown({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: BreakdownChartData;
  var session: Awaited<ReturnType<typeof getSession>> = null;
  try {
    [chartData, session] = await Promise.all([
      getIncomeCategoryBreakdown({
        from: params.from!,
        to: params.to!,
      }),
      getSession(),
    ]);
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect('/signin');
    throw error;
  }
  const currency = session?.user.currency;

  if (chartData.categories.length === 0) {
    return (
      <NoData title="Income Breakdown" customLink={<AddIncomeLinkBtn />} />
    );
  }

  return (
    <InsightCard title={`Income Breakdown (${currency})`}>
      <CategoryBreakdownChart chartData={chartData} />
    </InsightCard>
  );
}
