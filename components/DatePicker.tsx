"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, formatISO } from "date-fns";
import type { FormDateTime } from "@/lib/MuiDatePicker/types";
import { useState } from "react";

export default function DatePicker({
  value,
  onChange,
  disabled,
}: {
  value: FormDateTime;
  onChange: (date: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const date = value ? new Date(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="justify-start font-normal disabled:bg-[color-mix(in_oklab,var(--input)_80%,transparent)]!"
            disabled={disabled}
          >
            {value ? format(date!, "d MMMM yyyy") : <span>Pick a date</span>}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            onChange(formatISO(date!));
            setOpen(false);
          }}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
