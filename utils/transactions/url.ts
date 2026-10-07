import type { TransactionCategoriesSearchParams } from "@/types/transaction";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isAfter,
  isSameDay,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { parseURLDate, validIdParam } from "@/utils/url";
import type {
  TransactionByCategorySearchParams,
  SortTransactionBy,
} from "@/types/transaction";

export const day = "day";
export const week = "week";
export const month = "month";
export const year = "year";
export const custom = "custom";
export const periods = [day, week, month, year, custom] as const;
const validPeriodParams = [...periods, "from", "to"] as const;

export function validSearchParams(
  searchParams: TransactionCategoriesSearchParams,
): boolean {
  if (
    Object.keys(searchParams || {}).some(
      (key) =>
        ![...validPeriodParams, "sortBy"].includes(
          key as (typeof validPeriodParams)[number],
        ),
    )
  ) {
    return false;
  }

  const periodsParamsCnt = periods
    .map((period) => Object.hasOwn(searchParams || {}, period))
    .filter(Boolean)?.length;

  if (periodsParamsCnt === 0 || periodsParamsCnt > 1) return false;

  const [period, periodValue] = getActivePeriod(searchParams);

  if (period !== custom) {
    return (
      searchParams.from == null &&
      searchParams.to == null &&
      isValid(parseURLDate(periodValue))
    );
  }

  if (periodValue !== "true") return false;

  const fromDate = parseURLDate(searchParams.from);
  const toDate = parseURLDate(searchParams.to);

  return (
    isValid(fromDate) &&
    isValid(toDate) &&
    (isAfter(toDate, fromDate) || isSameDay(toDate, fromDate))
  );
}

export function dateFromSearchParams(
  searchParams: TransactionCategoriesSearchParams,
): { from: string; to: string } {
  const [period, periodValue] = getActivePeriod(searchParams);

  switch (period) {
    case day:
      return {
        from: formatDateParam(periodValue, "yyyy-MM-dd"),
        to: formatDateParam(periodValue, "yyyy-MM-dd"),
      };
    case week:
      return {
        from: formatDateParam(periodValue, "yyyy-MM-dd", startOfWeek),
        to: formatDateParam(periodValue, "yyyy-MM-dd", endOfWeek),
      };
    case month:
      return {
        from: formatDateParam(periodValue, "yyyy-MM-dd", startOfMonth),
        to: formatDateParam(periodValue, "yyyy-MM-dd", endOfMonth),
      };
    case year:
      return {
        from: formatDateParam(periodValue, "yyyy-MM-dd", startOfYear),
        to: formatDateParam(periodValue, "yyyy-MM-dd", endOfYear),
      };
    case custom:
      return {
        from: formatDateParam(searchParams.from, "yyyy-MM-dd"),
        to: formatDateParam(searchParams.to, "yyyy-MM-dd"),
      };
    default:
      return { from: "", to: "" };
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

  if (!period) return "";
  if (period === custom) {
    return (
      formatDateParam(searchParams.get("from"), "d MMM yyyy") +
      " - " +
      formatDateParam(searchParams.get("to"), "d MMM yyyy")
    );
  }

  return (
    {
      [day]: formatDateParam(periodValue, "EEE d MMM yyyy"),
      [week]:
        formatDateParam(periodValue, "d MMM", startOfWeek) +
        " - " +
        formatDateParam(periodValue, "d MMM yyyy", endOfWeek),
      [month]: formatDateParam(periodValue, "MMM yyyy", startOfMonth),
      [year]: formatDateParam(periodValue, "yyyy", startOfYear),
    }[period] || ""
  );
}

function formatDateParam(
  date: string | null | undefined,
  pattern: string,
  transform: (date: Date) => Date = (date) => date,
): string {
  const parsedDate = date == null ? new Date(NaN) : parseISO(date);
  if (!isValid(parsedDate)) return "Invalid Date";
  return format(transform(parsedDate), pattern);
}

function validSortBySearchParam(sortBy: SortTransactionBy) {
  return sortBy === "date" || sortBy === "amount";
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
