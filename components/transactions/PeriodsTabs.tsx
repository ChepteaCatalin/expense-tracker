"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState, useTransition } from "react";
import {
  custom,
  day,
  month,
  periods,
  week,
  year,
} from "@/utils/transactions/url";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import {
  handleDatePickerChange,
  toDatePickerValue,
  validDate,
} from "@/lib/MuiDatePicker/utils";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { type FormDateTime } from "@/lib/MuiDatePicker/types";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalizeFirstLetter } from "@/utils/string";

export default function PeriodsTabs({
  type,
}: {
  type: "expenses" | "incomes";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();
  const [isPending, startNavigation] = useTransition();

  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );

  const popoverOpened = Boolean(anchorEl);
  const popoverId = popoverOpened ? "popover" + id : undefined;

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
                    [day]: dayjs().format("YYYY-MM-DD"),
                    [week]: dayjs().startOf("week").format("YYYY-MM-DD"),
                    [month]: dayjs().startOf("month").format("YYYY-MM-DD"),
                    [year]: dayjs().startOf("year").format("YYYY-MM-DD"),
                  }[newValue]
                }`,
              );
            });
          }
        }}
      >
        <TabsList variant="line" className="mx-auto">
          {periods.map((period) => (
            <TabsTrigger
              key={period}
              disabled={isPending}
              value={period}
              onClick={(event) => {
                if (period === custom) setAnchorEl(event.currentTarget);
              }}
            >
              {capitalizeFirstLetter(period)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Popover
        id={popoverId}
        open={popoverOpened}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <CustomPeriodPopover
          type={type}
          submitRange={(params) => {
            setAnchorEl(null);
            startNavigation(() => {
              router.push(`/${type}/categories/?${params}`);
            });
          }}
        />
      </Popover>
      {isPending ? (
        <Progress indeterminate className="mt-1" />
      ) : (
        <div className="mt-1 h-1" />
      )}
    </div>
  );
}

function CustomPeriodPopover({
  type,
  submitRange,
}: {
  type: "expenses" | "incomes";
  submitRange: (params: string) => void;
}) {
  const searchParams = useSearchParams();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<{ from: FormDateTime; to: FormDateTime }>({
    shouldUnregister: true,
    mode: "onChange",
    defaultValues: {
      from: searchParams.get("from"),
      to: searchParams.get("to"),
    },
    resolver: zodResolver(
      z.object({ from: validDate, to: validDate }).refine(
        ({ from, to }) => {
          const fromDate = dayjs(from);
          const toDate = dayjs(to);

          if (!fromDate.isValid() || !toDate.isValid()) return true;

          return (
            toDate.isAfter(fromDate, "day") || toDate.isSame(fromDate, "day")
          );
        },
        {
          message: "To date must be on or after From date",
          path: ["to"],
        },
      ),
    ),
  });

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        submitRange(buildCustomPeriodParams(data));
      })}
      spacing={1.5}
      sx={{ p: 1.5, width: "260px" }}
    >
      <Typography>Choose date range:</Typography>
      <Controller
        name="from"
        control={control}
        render={({ field: { name, value, onChange } }) => (
          <DatePicker
            label="From"
            name={name}
            value={toDatePickerValue(value)}
            onChange={handleDatePickerChange((value) => {
              onChange(value);
              trigger("to");
            })}
            slotProps={{
              textField: {
                required: true,
                error: !!errors.from,
                helperText: errors.from?.message,
              },
            }}
          />
        )}
      />
      <Controller
        name="to"
        control={control}
        render={({ field: { name, value, onChange } }) => (
          <DatePicker
            label="To"
            name={name}
            value={toDatePickerValue(value)}
            onChange={handleDatePickerChange((value) => {
              onChange(value);
              trigger("from");
            })}
            slotProps={{
              textField: {
                required: true,
                error: !!errors.to,
                helperText: errors.to?.message,
              },
            }}
          />
        )}
      />
      <Button type="submit" variant="contained">
        View {type === "expenses" ? "Expenses" : "Income"}
      </Button>
    </Stack>
  );
}

function buildCustomPeriodParams(data: {
  from: FormDateTime;
  to: FormDateTime;
}) {
  return new URLSearchParams({
    [custom]: "true",
    from: dayjs(data.from).format("YYYY-MM-DD"),
    to: dayjs(data.to).format("YYYY-MM-DD"),
  }).toString();
}
