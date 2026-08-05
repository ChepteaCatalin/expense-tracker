import type { TransactionCategoriesSearchParams } from '@/types/transaction';
import dayjs from 'dayjs';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { parseURLDate, validIdParam } from '@/utils/url';
import type {
  TransactionByCategorySearchParams,
  SortTransactionBy,
} from '@/types/transaction';

export const day = 'day';
export const week = 'week';
export const month = 'month';
export const year = 'year';
export const custom = 'custom';
export const periods = [day, week, month, year, custom] as const;
const validPeriodParams = [...periods, 'from', 'to'] as const;

export function validSearchParams(
  searchParams: TransactionCategoriesSearchParams,
): boolean {
  if (
    Object.keys(searchParams || {}).some(
      key =>
        ![...validPeriodParams, 'sortBy'].includes(
          key as (typeof validPeriodParams)[number],
        ),
    )
  ) {
    return false;
  }

  const periodsParamsCnt = periods
    .map(period => Object.hasOwn(searchParams || {}, period))
    .filter(Boolean)?.length;

  if (periodsParamsCnt === 0 || periodsParamsCnt > 1) return false;

  const [period, periodValue] = getActivePeriod(searchParams);

  if (period !== custom) {
    return (
      searchParams.from == null &&
      searchParams.to == null &&
      parseURLDate(periodValue).isValid()
    );
  }

  if (periodValue !== 'true') return false;

  const fromDate = parseURLDate(searchParams.from);
  const toDate = parseURLDate(searchParams.to);

  return (
    fromDate.isValid() &&
    toDate.isValid() &&
    (toDate.isAfter(fromDate, 'day') || toDate.isSame(fromDate, 'day'))
  );
}

export function dateFromSearchParams(
  searchParams: TransactionCategoriesSearchParams,
): { from: string; to: string } {
  const [period, periodValue] = getActivePeriod(searchParams);

  switch (period) {
    case day:
      return {
        from: dayjs(periodValue).format('YYYY-MM-DD'),
        to: dayjs(periodValue).format('YYYY-MM-DD'),
      };
    case week:
      return {
        from: dayjs(periodValue).startOf('week').format('YYYY-MM-DD'),
        to: dayjs(periodValue).endOf('week').format('YYYY-MM-DD'),
      };
    case month:
      return {
        from: dayjs(periodValue).startOf('month').format('YYYY-MM-DD'),
        to: dayjs(periodValue).endOf('month').format('YYYY-MM-DD'),
      };
    case year:
      return {
        from: dayjs(periodValue).startOf('year').format('YYYY-MM-DD'),
        to: dayjs(periodValue).endOf('year').format('YYYY-MM-DD'),
      };
    case custom:
      return {
        from: dayjs(searchParams.from).format('YYYY-MM-DD'),
        to: dayjs(searchParams.to).format('YYYY-MM-DD'),
      };
    default:
      return { from: '', to: '' };
  }
}

export function stringifySearchParams<T extends object>(searchParams: {
  [K in keyof T]: SearchParamValue;
}): string {
  const entries: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(searchParams) as Array<
    [string, SearchParamValue]
  >) {
    if (value != null) {
      entries.push([key, value]);
    }
  }

  return new URLSearchParams(entries).toString();
}

function getActivePeriod(searchParams: TransactionCategoriesSearchParams) {
  return (
    (Object.entries(searchParams || {}) || []).find(([key]) =>
      periods.includes(key as (typeof periods)[number]),
    ) || []
  );
}

export function getActivePeriodEntry(
  searchParams: ReadonlyURLSearchParams,
): [string, string] | [] {
  return (
    Array.from(searchParams.entries()).find(([key]) =>
      periods.includes(key as (typeof periods)[number]),
    ) || []
  );
}

export function parsePeriod(searchParams: ReadonlyURLSearchParams): string {
  const [period, periodValue] = getActivePeriodEntry(searchParams);

  if (!period) return '';
  if (period === custom) {
    return (
      dayjs(searchParams.get('from')).format('D MMM YYYY') +
      ' - ' +
      dayjs(searchParams.get('to')).format('D MMM YYYY')
    );
  }

  return (
    {
      [day]: dayjs(periodValue).format('ddd D MMM YYYY'),
      [week]:
        dayjs(periodValue).startOf('week').format('D MMM') +
        ' - ' +
        dayjs(periodValue).endOf('week').format('D MMM YYYY'),
      [month]: dayjs(periodValue).startOf('month').format('MMM YYYY'),
      [year]: dayjs(periodValue).startOf('year').format('YYYY'),
    }[period] || ''
  );
}

function validSortBySearchParam(sortBy: SortTransactionBy) {
  return sortBy === 'date' || sortBy === 'amount';
}

export function notFoundOnInvalidParams(
  params: { id: string },
  searchParams: TransactionByCategorySearchParams,
) {
  if (
    !validSearchParams(searchParams) ||
    !validIdParam(params.id) ||
    !validSortBySearchParam(searchParams.sortBy as SortTransactionBy)
  ) {
    notFound();
  }
}

type SearchParamValue = string | null | undefined;
