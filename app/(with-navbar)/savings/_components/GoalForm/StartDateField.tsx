'use client';

import {
  handleDatePickerChange,
  toDatePickerValue,
} from '@/lib/MuiDatePicker/utils';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

export default function StartDateField({
  isEditMode,
}: {
  isEditMode?: boolean;
}) {
  return (
    <Controller
      name="startDate"
      {...(!isEditMode && { defaultValue: dayjs().toISOString() })}
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
