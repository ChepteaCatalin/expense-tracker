"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter, useSearchParams } from "next/navigation";
import {
  custom,
  getActivePeriodEntry,
  parsePeriod,
} from "@/utils/transactions/url";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import type { OpUnitType, ManipulateType } from "dayjs";
import { useTransition } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

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
      router.push(
        `/${type}/categories?${period}=${dayjs(periodValue)
          .startOf(period as OpUnitType)
          .add(offset, period as ManipulateType)
          .format("YYYY-MM-DD")}`,
      );
    });
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
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
      <Grid container sx={{ alignItems: "center", mx: "auto", gap: 0.75 }}>
        {isPending && <CircularProgress size={14} />}
        <p>{parsePeriod(searchParams)}</p>
      </Grid>
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
    </Grid>
  );
}
