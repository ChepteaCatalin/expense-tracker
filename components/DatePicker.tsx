"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, formatISO, parseISO } from "date-fns";
import { useState } from "react";

/** `minDate` and `maxDate` are inclusive calendar days (`yyyy-MM-dd`). */
export default function DatePicker({
  value,
  onChange,
  disabled,
  minDate,
  maxDate,
  invalid,
}: {
  value: string | null;
  onChange: (date: string) => void;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const date = value ? new Date(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="disabled:bg-input/50 dark:disabled:bg-input/80 justify-start font-normal"
            disabled={disabled}
            aria-invalid={invalid || undefined}
          >
            {value ? format(date!, "d MMMM yyyy") : <span>Pick a date</span>}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          required
          selected={date}
          onSelect={(date) => {
            onChange(formatISO(date));
            setOpen(false);
          }}
          defaultMonth={date}
          disabled={[
            ...(minDate ? [{ before: parseISO(minDate) }] : []),
            ...(maxDate ? [{ after: parseISO(maxDate) }] : []),
          ]}
        />
      </PopoverContent>
    </Popover>
  );
}
