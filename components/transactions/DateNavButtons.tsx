"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  custom,
  day,
  getActivePeriodEntry,
  month,
  parsePeriod,
  week,
  year,
} from "@/utils/transactions/url";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { useTransition } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const periodFns: Record<
  typeof day | typeof week | typeof month | typeof year,
  { startOf: (date: Date) => Date; add: (date: Date, amount: number) => Date }
> = {
  [day]: { startOf: startOfDay, add: addDays },
  [week]: { startOf: startOfWeek, add: addWeeks },
  [month]: { startOf: startOfMonth, add: addMonths },
  [year]: { startOf: startOfYear, add: addYears },
};

export default function DateNavButtons({
  type,
}: {
  type: "expenses" | "incomes";
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startNavigation] = useTransition();

  const [period, periodValue] = getActivePeriodEntry(searchParams);

  const navigatePeriod = (offset: -1 | 1) => {
    startNavigation(() => {
      const { startOf, add } = periodFns[period as keyof typeof periodFns];
      router.push(
        `/${type}/categories?${period}=${format(
          add(startOf(parseISO(periodValue as string)), offset),
          "yyyy-MM-dd",
        )}`,
      );
    });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {period !== custom && (
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="previous"
          disabled={isPending}
          onClick={() => navigatePeriod(-1)}
        >
          <ArrowLeft />
        </Button>
      )}
      <div className="mx-auto flex items-center gap-1.5">
        {isPending && <Spinner className="text-primary-light" />}
        <p>{parsePeriod(searchParams)}</p>
      </div>
      {period !== custom && (
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="next"
          disabled={isPending}
          onClick={() => navigatePeriod(1)}
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  );
}
