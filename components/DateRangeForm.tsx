"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { DateRange } from "react-day-picker";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError } from "@/components/ui/field";

const dateRangeSchema = z.object({
  range: z.object(
    {
      from: z.date({ error: "Please select a start date" }),
      to: z.date({ error: "Please select an end date" }),
    },
    { error: "Please select a date range" },
  ),
});

export type SelectedDateRange = z.output<typeof dateRangeSchema>["range"];

export default function DateRangeForm({
  defaultValue,
  submitLabel,
  onSubmit,
}: {
  defaultValue?: DateRange;
  submitLabel: string;
  onSubmit: (range: SelectedDateRange) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<
    z.input<typeof dateRangeSchema>,
    unknown,
    z.output<typeof dateRangeSchema>
  >({
    mode: "onChange",
    defaultValues: { range: defaultValue },
    resolver: zodResolver(dateRangeSchema),
  });

  const rangeError =
    errors.range?.message ??
    errors.range?.from?.message ??
    errors.range?.to?.message;

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data.range))}>
      <Controller
        name="range"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value ?? undefined}
            onSelect={(range) => onChange(range ?? null)}
            numberOfMonths={2}
          />
        )}
      />
      <Field className="border-t p-2">
        {rangeError && <FieldError>{rangeError}</FieldError>}
        <Button type="submit">{submitLabel}</Button>
      </Field>
    </form>
  );
}
