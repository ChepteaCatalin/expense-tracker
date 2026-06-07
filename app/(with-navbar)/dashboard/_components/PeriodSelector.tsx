'use client';

import type { FormDateTime } from '@/lib/MuiDatePicker/types';
import { toDatePickerValue, validDate } from '@/lib/MuiDatePicker/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { normalizedSearchParams } from '../utils';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { useEffect } from 'react';

export default function PeriodSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    trigger,
    handleSubmit,
    resetDefaultValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<{ from: FormDateTime; to: FormDateTime }>({
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  });

  useEffect(
    function resetFormOnMount() {
      reset(getDefaultValues());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Stack
      component="form"
      noValidate
      direction={{ xs: 'column', md: 'row' }}
      onSubmit={handleSubmit(data => {
        router.push(`/dashboard/?${buildSearchParams(data)}`);
        resetDefaultValues(data);
      })}
      sx={{
        width: '100%',
        alignItems: 'center',
        gap: 1,
        mb: 1,
      }}
    >
      <Controller
        name="from"
        control={control}
        render={({ field: { name, value, onChange } }) => (
          <DatePicker
            label="From"
            name={name}
            value={toDatePickerValue(value)}
            onChange={handleDateChange(value => {
              onChange(value);
              trigger('to');
            })}
            slotProps={{
              textField: {
                required: true,
                error: !!errors.from,
              },
            }}
            sx={{ maxWidth: 250 }}
          />
        )}
      />
      <ArrowForwardIcon
        sx={{
          color: 'text.secondary',
          mx: 1,
          transform: { xs: 'rotate(90deg)', md: 'none' },
        }}
      />
      <Controller
        name="to"
        control={control}
        render={({ field: { name, value, onChange } }) => (
          <DatePicker
            label="To"
            name={name}
            value={toDatePickerValue(value)}
            onChange={handleDateChange(value => {
              onChange(value);
              trigger('from');
            })}
            slotProps={{
              textField: {
                required: true,
                error: !!errors.to,
              },
            }}
            sx={{ maxWidth: 250 }}
          />
        )}
      />
      {isDirty && isValid && (
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: { xs: 1, md: 0 }, ml: { xs: 0, md: 1 } }}
        >
          View Insights
        </Button>
      )}
    </Stack>
  );

  function getDefaultValues() {
    return normalizedSearchParams({
      from: searchParams.get('from'),
      to: searchParams.get('to'),
    });
  }
}

const schema = z.object({ from: validDate, to: validDate }).refine(
  ({ from, to }) => {
    const fromDate = dayjs(from);
    const toDate = dayjs(to);

    if (!fromDate.isValid() || !toDate.isValid()) return true;

    return toDate.isAfter(fromDate, 'day') || toDate.isSame(fromDate, 'day');
  },
  {
    message: 'To date must be on or after From date',
    path: ['to'],
  },
);

function buildSearchParams(data: { from: FormDateTime; to: FormDateTime }) {
  return new URLSearchParams({
    from: dayjs(data.from).format('YYYY-MM-DD'),
    to: dayjs(data.to).format('YYYY-MM-DD'),
  }).toString();
}

function handleDateChange(onChange: (...event: any[]) => void) {
  return (date: PickerValue) =>
    onChange(date?.isValid() ? date.format('YYYY-MM-DD') : null);
}
