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
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import IconButton from '@mui/material/IconButton';

export default function Period() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = normalizedSearchParams({
    from: searchParams.get('from'),
    to: searchParams.get('to'),
  });

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
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const [changingPeriod, setChangingPeriod] = useState(false);

  useEffect(
    function resetFormOnMount() {
      reset(initialValues);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(function onUnmount() {
    return () => {
      setChangingPeriod(false);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" sx={{ mb: 2, alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            {dayjs(initialValues.from).format('D MMM YYYY')}
          </Typography>
          <ArrowForwardIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography sx={{ fontWeight: 600 }}>
            {dayjs(initialValues.to).format('D MMM YYYY')}
          </Typography>
        </Box>
        {!changingPeriod && (
          <IconButton onClick={() => setChangingPeriod(true)}>
            <DateRangeIcon />
          </IconButton>
        )}
      </Stack>
      {changingPeriod && (
        <Stack
          component="form"
          noValidate
          direction={{ xs: 'column', md: 'row' }}
          onSubmit={handleSubmit(data => {
            router.push(`/dashboard/?${buildSearchParams(data)}`);
            resetDefaultValues(data);
            setChangingPeriod(false);
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
          <Stack
            direction="row"
            sx={{
              gap: 1.5,
              mt: { xs: 1, md: 0 },
              ml: { xs: 0, md: 1 },
            }}
          >
            {isDirty && isValid && (
              <Button type="submit" variant="outlined">
                View Insights
              </Button>
            )}
            <Button
              onClick={() => {
                reset(initialValues);
                setChangingPeriod(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
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
