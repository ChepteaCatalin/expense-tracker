import type { DashboardSearchParams } from "@/types/dashboard";
import { parseURLDate } from "@/utils/url";
import { format, isAfter, isSameDay, isValid, startOfYear } from "date-fns";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export async function getValidNormalizedSearchParams(
  searchParams: Promise<DashboardSearchParams>,
) {
  const awaitedSearchParams = await searchParams;

  if (!validSearchParams(awaitedSearchParams)) notFound();
  if (!awaitedSearchParams.from && !awaitedSearchParams.to) await connection();

  return normalizedSearchParams(awaitedSearchParams);
}

export function validSearchParams({ from, to }: DashboardSearchParams) {
  if (!from && !to) return true;

  const fromDate = parseURLDate(from);
  const toDate = parseURLDate(to);

  return (
    isValid(fromDate) &&
    isValid(toDate) &&
    (isAfter(toDate, fromDate) || isSameDay(toDate, fromDate))
  );
}

export function normalizedSearchParams({
  from,
  to,
}: DashboardSearchParams): DashboardSearchParams {
  if (!from && !to)
    return {
      from: format(startOfYear(new Date()), "yyyy-MM-dd"),
      to: format(new Date(), "yyyy-MM-dd"),
    };

  return { from, to };
}
