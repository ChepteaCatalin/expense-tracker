import type {
  DashboardSearchParams,
  ExpenseCategoryBreakdown,
} from '@/types/dashboard';
import { getValidNormalizedSearchParams } from '../utils';
import InsightCard from '../_components/InsightCard';
import ExpensesBreakdownChart from './ExpensesBreakdownChart';
import { getSession } from '@/data/auth';
import { getExpenseCategoryBreakdown } from '@/data/dashboard';
import { redirect } from 'next/navigation';
import { UnauthorizedError } from '@/utils/error';

export default async function ExpensesBreakdown({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await getValidNormalizedSearchParams(searchParams);

  var chartData: ExpenseCategoryBreakdown;
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

  return (
    <InsightCard title={`Expenses Breakdown (${currency})`}>
      <ExpensesBreakdownChart chartData={chartData} />
    </InsightCard>
  );
}
