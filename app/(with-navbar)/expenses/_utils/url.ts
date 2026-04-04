import type { ExpenseByCategorySearchParams } from '@/types/expense';
import dayjs from 'dayjs';

export const day = 'day';
export const week = 'week';
export const month = 'month';
export const year = 'year';
export const custom = 'custom';
export const periods = [day, week, month, year, custom] as const;
export const customPeriodIdx = periods.findIndex(x => x === custom);
const validPeriodParams = [...periods, 'from', 'to'] as const;
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export function validSearchParams(
  searchParams: ExpenseByCategorySearchParams,
): boolean {
  if (
    Object.keys(searchParams || {}).some(
      key =>
        !validPeriodParams.includes(key as (typeof validPeriodParams)[number]),
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
  searchParams: ExpenseByCategorySearchParams,
): { from: string; to: string } {
  const [period, periodValue] = getActivePeriod(searchParams);

  if (!period) return { from: '', to: '' };
  return (
    {
      [day]: {
        from: dayjs(periodValue).format('YYYY-MM-DD'),
        to: dayjs(periodValue).format('YYYY-MM-DD'),
      },
      [week]: {
        from: dayjs(periodValue).startOf('week').format('YYYY-MM-DD'),
        to: dayjs(periodValue).endOf('week').format('YYYY-MM-DD'),
      },
      [month]: {
        from: dayjs(periodValue).startOf('month').format('YYYY-MM-DD'),
        to: dayjs(periodValue).endOf('month').format('YYYY-MM-DD'),
      },
      [year]: {
        from: dayjs(periodValue).startOf('year').format('YYYY-MM-DD'),
        to: dayjs(periodValue).endOf('year').format('YYYY-MM-DD'),
      },
      [custom]: {
        from: dayjs(searchParams.from).format('YYYY-MM-DD'),
        to: dayjs(searchParams.to).format('YYYY-MM-DD'),
      },
    }[period] || { from: '', to: '' }
  );
}

function getActivePeriod(searchParams: ExpenseByCategorySearchParams) {
  return (
    (Object.entries(searchParams || {}) || []).find(([key]) =>
      periods.includes(key as (typeof periods)[number]),
    ) || []
  );
}

function parseURLDate(date: string | null | undefined) {
  if (typeof date !== 'string' || !isoDateRegex.test(date)) return dayjs('');

  const parsedDate = dayjs(date);
  if (!parsedDate.isValid() || parsedDate.format('YYYY-MM-DD') !== date) {
    return dayjs('');
  }

  return parsedDate;
}
