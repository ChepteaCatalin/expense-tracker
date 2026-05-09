import Link from 'next/link';
import Fab from '@/components/Fab';
import type { TransactionCategoriesSearchParams } from '@/types/transaction';
import { stringifySearchParams } from '@/utils/transactions/url';

export default async function NewExpenseFab({
  searchParams,
}: {
  searchParams:
    | TransactionCategoriesSearchParams
    | Promise<TransactionCategoriesSearchParams>;
}) {
  return (
    <Link
      href={`/expenses/new?${stringifySearchParams(await Promise.resolve(searchParams))}`}
    >
      <Fab />
    </Link>
  );
}
