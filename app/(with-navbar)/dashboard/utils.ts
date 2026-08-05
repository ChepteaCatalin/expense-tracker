import type { DashboardSearchParams } from '@/types/dashboard';
import { parseURLDate } from '@/utils/url';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';

export async function getValidNormalizedSearchParams(
  searchParams: Promise<DashboardSearchParams>,
) {
  const awaitedSearchParams = await searchParams;

  if (!validSearchParams(awaitedSearchParams)) notFound();

  // The default range ends "today", so it must be computed at request time
  // rather than while prerendering the route's shell.
  if (!awaitedSearchParams.from && !awaitedSearchParams.to)
    await connection();

  return normalizedSearchParams(awaitedSearchParams);
}

export function validSearchParams({ from, to }: DashboardSearchParams) {
  if (!from && !to) return true;

  const fromDate = parseURLDate(from);
  const toDate = parseURLDate(to);

  return (
    fromDate.isValid() &&
    toDate.isValid() &&
    (toDate.isAfter(fromDate, 'day') || toDate.isSame(fromDate, 'day'))
  );
}

export function normalizedSearchParams({
  from,
  to,
}: DashboardSearchParams): DashboardSearchParams {
  if (!from && !to)
    return {
      from: dayjs().startOf('year').format('YYYY-MM-DD'),
      to: dayjs().format('YYYY-MM-DD'),
    };

  return { from, to };
}
