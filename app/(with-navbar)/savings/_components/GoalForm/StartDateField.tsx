'use client';

import {
  handleDatePickerChange,
  toDatePickerValue,
} from '@/lib/MuiDatePicker/utils';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

export default function StartDateField({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <Controller
      name="startDate"
      defaultValue={defaultValue ?? dayjs().toISOString()}
      render={({
        field: { name, value, onChange, disabled },
        fieldState: { error },
      }) => (
        <DatePicker
          label="Start Date"
          name={name}
          disabled={disabled}
          value={toDatePickerValue(value)}
          onChange={handleDatePickerChange(onChange)}
          slotProps={{
            textField: {
              required: true,
              error: !!error,
              helperText: error?.message?.toString(),
            },
          }}
        />
      )}
    />
  );
}
