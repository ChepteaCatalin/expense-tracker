'use client';

import type { FormDateTime } from '@/lib/MuiDatePicker/types';
import { toDatePickerValue, validDate } from '@/lib/MuiDatePicker/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { normalizedSearchParams, validSearchParams } from '../utils';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { useId, useState, useTransition } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Popover from '@mui/material/Popover';
import type { DashboardSearchParams } from '@/types/dashboard';

export default function Period() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startNavigation] = useTransition();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );
  const id = useId();

  const periodParams = {
    from: searchParams.get('from'),
    to: searchParams.get('to'),
  };
  if (!validSearchParams(periodParams)) notFound();
  const defaultValues = normalizedSearchParams(periodParams);

  const popoverOpened = Boolean(anchorEl);
  const popoverId = popoverOpened ? 'popover' + id : undefined;

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" sx={{ mb: 1, alignItems: 'center', gap: 0.5 }}>
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
            {formatPeriodDate(defaultValues.from)}
          </Typography>
          <ArrowForwardIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography sx={{ fontWeight: 600 }}>
            {formatPeriodDate(defaultValues.to)}
          </Typography>
        </Box>
        <IconButton
          onClick={event => setAnchorEl(event.currentTarget)}
          aria-label="choose date range"
          aria-describedby={popoverId}
        >
          <DateRangeIcon />
        </IconButton>
        <Popover
          id={popoverId}
          open={popoverOpened}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <PeriodPopover
            defaultValues={defaultValues}
            onSubmit={params => {
              setAnchorEl(null);
              startNavigation(() => {
                router.push(`/dashboard/?${params}`);
              });
            }}
          />
        </Popover>
      </Stack>
      {isPending ? (
        <LinearProgress sx={{ borderRadius: '999px' }} />
      ) : (
        <Box sx={{ height: 4 }} />
      )}
    </Box>
  );
}

function PeriodPopover({
  defaultValues,
  onSubmit,
}: {
  defaultValues: DashboardSearchParams;
  onSubmit: (params: string) => void;
}) {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<{ from: FormDateTime; to: FormDateTime }>({
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues,
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
      onSubmit={handleSubmit(data => {
        onSubmit(
          new URLSearchParams({
            from: dayjs(data.from).format('YYYY-MM-DD'),
            to: dayjs(data.to).format('YYYY-MM-DD'),
          }).toString(),
        );
      })}
      spacing={1.5}
      sx={{ p: 1.5, width: '260px' }}
    >
      <Typography>Date range:</Typography>
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
            onChange={handleDateChange(value => {
              onChange(value);
              trigger('from');
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
        View Insights
      </Button>
    </Stack>
  );
}

function formatPeriodDate(value: string | null | undefined) {
  return dayjs(value).format('D MMM YYYY');
}

function handleDateChange(onChange: (...event: any[]) => void) {
  return (date: PickerValue) =>
    onChange(date?.isValid() ? date.format('YYYY-MM-DD') : null);
}
