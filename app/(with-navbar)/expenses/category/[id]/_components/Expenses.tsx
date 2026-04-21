import type { ExpensesByCategorySearchParams } from '@/types/expense';
import { validateParams } from '../utils';

export default async function Expenses({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const awaitedParams = await params;

  validateParams(awaitedParams, awaitedSearchParams);

  return <div>Expenses List</div>;
}
