import { ExpensesByCategorySearchParams } from '@/types/expense';
import { validateParams } from '../utils';
import { getCategoryNameById } from '@/data/category';
import { notFound, redirect } from 'next/navigation';
import { UnauthorizedError } from '@/utils/error';

export default async function Overview({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  validateParams(awaitedParams, awaitedSearchParams);

  try {
    var categoryName = await getCategoryNameById(+awaitedParams.id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }
  if (!categoryName) notFound();

  return <div>Overview: {categoryName}</div>;
}
