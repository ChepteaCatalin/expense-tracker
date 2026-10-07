"use client";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { normalizedSearchParams, validSearchParams } from "../utils";
import DateRangeForm from "@/components/DateRangeForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PeriodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startNavigation] = useTransition();
  const [open, setOpen] = useState(false);

  const periodParams = {
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  };
  if (!validSearchParams(periodParams)) notFound();
  const defaultValues = normalizedSearchParams(periodParams);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              aria-label="choose date range"
              className="mb-2 justify-start px-2.5 font-semibold"
            >
              <CalendarIcon />
              {formatPeriodDate(defaultValues.from)} -{" "}
              {formatPeriodDate(defaultValues.to)}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <DateRangeForm
            defaultValue={{
              from: parseDate(defaultValues.from),
              to: parseDate(defaultValues.to),
            }}
            submitLabel="View Insights"
            onSubmit={({ from, to }) => {
              setOpen(false);
              const params = new URLSearchParams({
                from: format(from, "yyyy-MM-dd"),
                to: format(to, "yyyy-MM-dd"),
              });
              startNavigation(() => {
                router.push(`/dashboard/?${params}`);
              });
            }}
          />
        </PopoverContent>
      </Popover>
      {isPending ? <Progress indeterminate /> : <div className="h-1" />}
    </div>
  );
}

function parseDate(value: string | null | undefined) {
  return value ? parseISO(value) : undefined;
}

function formatPeriodDate(value: string | null | undefined) {
  return value ? format(parseISO(value), "d MMM yyyy") : "";
}
