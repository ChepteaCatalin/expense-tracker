import Link from 'next/link';
import Fab from '@/components/Fab';
import type { ExpenseCategoriesSearchParams } from '@/types/expense';
import { stringifySearchParams } from '../_utils/url';

export default async function NewExpenseFab({
  searchParams,
}: {
  searchParams:
    | ExpenseCategoriesSearchParams
    | Promise<ExpenseCategoriesSearchParams>;
}) {
  return (
    <Link
      href={`/expenses/new?${stringifySearchParams(await Promise.resolve(searchParams))}`}
    >
      <Fab />
    </Link>
  );
}
