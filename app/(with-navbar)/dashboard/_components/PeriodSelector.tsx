'use client';

import type { FormDateTime } from '@/lib/MuiDatePicker/types';
import {
  handleDatePickerChange,
  toDatePickerValue,
  validDate,
} from '@/lib/MuiDatePicker/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PeriodSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<{ from: FormDateTime; to: FormDateTime }>({
    mode: 'onChange',
    defaultValues: {
      from: searchParams.get('from'),
      to: searchParams.get('to'),
    },
    resolver: zodResolver(
      z.object({ from: validDate, to: validDate }).refine(
        ({ from, to }) => {
          const fromDate = dayjs(from);
          const toDate = dayjs(to);

          if (!fromDate.isValid() || !toDate.isValid()) return true;

          return (
            toDate.isAfter(fromDate, 'day') || toDate.isSame(fromDate, 'day')
          );
        },
        {
          message: 'To date must be on or after From date',
          path: ['to'],
        },
      ),
    ),
  });

  return (
    <Stack
      component="form"
      noValidate
      direction={{ xs: 'column', md: 'row' }}
      onSubmit={handleSubmit(data => {
        router.push(`/dashboard/?${buildSearchParams(data)}`);
      })}
      sx={{
        width: '100%',
        justifyContent: 'flex-end',
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
            onChange={handleDatePickerChange(value => {
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
            onChange={handleDatePickerChange(value => {
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
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: { xs: 1, md: 0 }, ml: { xs: 0, md: 1 } }}
      >
        View Insights
      </Button>
    </Stack>
  );
}

function buildSearchParams(data: { from: FormDateTime; to: FormDateTime }) {
  return new URLSearchParams({
    from: dayjs(data.from).format('YYYY-MM-DD'),
    to: dayjs(data.to).format('YYYY-MM-DD'),
  }).toString();
}
