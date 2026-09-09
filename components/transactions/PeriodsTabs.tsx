"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  custom,
  day,
  month,
  periods,
  week,
  year,
} from "@/utils/transactions/url";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalizeFirstLetter } from "@/utils/string";
import {
  addDays,
  format,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PeriodsTabs({
  type,
}: {
  type: "expenses" | "incomes";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startNavigation] = useTransition();

  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="mb-1">
      <Tabs
        value={periods.find((period) => searchParams.has(period)) ?? periods[0]}
        onValueChange={(newValue: string) => {
          if (newValue !== custom) {
            startNavigation(() => {
              router.push(
                `/${type}/categories?${newValue}=${
                  {
                    [day]: format(new Date(), "yyyy-MM-dd"),
                    [week]: format(startOfWeek(new Date()), "yyyy-MM-dd"),
                    [month]: format(startOfMonth(new Date()), "yyyy-MM-dd"),
                    [year]: format(startOfYear(new Date()), "yyyy-MM-dd"),
                  }[newValue]
                }`,
              );
            });
          }
        }}
      >
        <TabsList variant="line" className="mx-auto">
          {periods.map((period) =>
            period !== custom ? (
              <TabsTrigger key={period} disabled={isPending} value={period}>
                {capitalizeFirstLetter(period)}
              </TabsTrigger>
            ) : (
              <Popover
                key={period}
                open={calendarOpen}
                onOpenChange={setCalendarOpen}
              >
                <PopoverTrigger
                  render={
                    <TabsTrigger disabled={isPending} value={period}>
                      {capitalizeFirstLetter(period)}
                    </TabsTrigger>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <RangeCalendar
                    type={type}
                    onNavigate={(params) => {
                      setCalendarOpen(false);
                      startNavigation(() => {
                        router.push(`/${type}/categories/?${params}`);
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
            ),
          )}
        </TabsList>
      </Tabs>
      {isPending ? (
        <Progress indeterminate className="mt-1" />
      ) : (
        <div className="mt-1 h-1" />
      )}
    </div>
  );
}

function RangeCalendar({
  type,
  onNavigate,
}: {
  type: "expenses" | "incomes";
  onNavigate: (data: string) => void;
}) {
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    return {
      from: fromParam ? parseISO(fromParam) : today,
      to: toParam ? parseISO(toParam) : addDays(today, 30),
    };
  });

  return (
    <>
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
      />
      <Button
        onClick={() => {
          onNavigate(buildCustomPeriodParams(dateRange));
        }}
        className="mx-2 mb-2"
      >
        View {type === "expenses" ? "Expenses" : "Income"}
      </Button>
    </>
  );
}

function buildCustomPeriodParams(data: DateRange | undefined) {
  return new URLSearchParams({
    [custom]: "true",
    from: data?.from ? format(data.from, "yyyy-MM-dd") : "",
    to: data?.to ? format(data.to, "yyyy-MM-dd") : "",
  }).toString();
}
