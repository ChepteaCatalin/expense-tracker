import type {
  DashboardSearchParams,
  BreakdownChartData,
} from '@/types/dashboard';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import { getSession } from '@/data/auth';
import { getExpenseCategoryBreakdown } from '@/data/dashboard';
import { redirect } from 'next/navigation';
import { UnauthorizedError } from '@/utils/error';
import CategoryBreakdownChart from '../_components/CategoryBreakdownChart';
import AddExpensesLinkBtn from '../_components/AddExpensesLinkBtn';
import NoData from '../_components/NoData';

export default async function ExpensesBreakdown({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: BreakdownChartData;
  try {
    chartData = await getExpenseCategoryBreakdown({
      from: params.from!,
      to: params.to!,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect('/signin');
    throw error;
  }
  const currency = (await getSession())?.user.currency;

  if (chartData.categories.length === 0) {
    return (
      <NoData title="Expenses Breakdown" customLink={<AddExpensesLinkBtn />} />
    );
  }

  return (
    <InsightCard title={`Expenses Breakdown (${currency})`}>
      <CategoryBreakdownChart chartData={chartData} />
    </InsightCard>
  );
}
