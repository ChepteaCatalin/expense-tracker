import { getSession } from '@/data/auth';
import InsightCard from '../_components/InsightCard';
import TreemapChart from '../_components/TreemapChart';
import { getValidNormalizedSearchParams } from '../utils';
import type {
  CategoryTreemapNode,
  DashboardSearchParams,
} from '@/types/dashboard';
import { getExpenseCategoryTreemapData } from '@/data/dashboard';
import { UnauthorizedError } from '@/utils/error';
import { redirect } from 'next/navigation';
import NoData from '../_components/NoData';
import AddExpensesLinkBtn from '../_components/AddExpensesLinkBtn';

export default async function ExpensesTreemap({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: CategoryTreemapNode[];
  try {
    chartData = await getExpenseCategoryTreemapData({
      from: params.from!,
      to: params.to!,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect('/signin');
    throw error;
  }
  const currency = (await getSession())?.user.currency;

  if (chartData.length === 0) {
    return (
      <NoData
        title="Expenses by Category"
        customLink={<AddExpensesLinkBtn />}
      />
    );
  }

  return (
    <InsightCard title={`Expenses by Category (${currency})`}>
      <TreemapChart data={chartData} currency={currency} />
    </InsightCard>
  );
}
