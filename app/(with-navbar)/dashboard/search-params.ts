import "server-only";

import type { DashboardSearchParams } from "@/types/dashboard";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getToday } from "@/lib/today";
import { normalizedSearchParams, validSearchParams } from "./utils";

export async function getValidNormalizedSearchParams(
  searchParams: Promise<DashboardSearchParams>,
) {
  const awaitedSearchParams = await searchParams;

  if (!validSearchParams(awaitedSearchParams)) notFound();
  if (!awaitedSearchParams.from && !awaitedSearchParams.to) {
    await connection();
    return normalizedSearchParams(awaitedSearchParams, await getToday());
  }

  return normalizedSearchParams(awaitedSearchParams);
}
