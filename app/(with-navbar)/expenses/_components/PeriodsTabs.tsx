'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useId, useState } from 'react';
import { custom, customPeriodIdx, periods } from '../_utils/url';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import {
  handleDatePickerChange,
  toDatePickerValue,
  validDate,
} from '@/lib/MuiDatePicker/utils';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { FormDateTime } from '@/lib/MuiDatePicker/types';

export default function PeriodsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();

  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );

  const popoverOpened = Boolean(anchorEl);
  const popoverId = popoverOpened ? 'popover' + id : undefined;

  return (
    <Box mb={0.75}>
      <Tabs
        value={tabIdxFromSearchParams(searchParams)}
        onChange={(_event, newValue: number) => {
          if (newValue !== customPeriodIdx) {
            router.replace(
              `/expenses/categories${defaultPeriodsParam(newValue)}`,
            );
          }
        }}
        aria-label="periods tabs"
        sx={{
          mt: -1,
          minHeight: '32px',
          '& .MuiTabs-list': {
            justifyContent: 'center',
          },
          '& .MuiTab-root': {
            textTransform: 'capitalize',
            py: 0.5,
            minWidth: 'auto',
            minHeight: '32px',
          },
        }}
      >
        {periods.map((period, index) => (
          <Tab
            key={period}
            label={period}
            id={`tab-${id}-${index}`}
            aria-controls={`tabpanel-${id}-${index}`}
            onClick={event => {
              if (index === customPeriodIdx) setAnchorEl(event.currentTarget);
            }}
          />
        ))}
      </Tabs>
      <Popover
        id={popoverId}
        open={popoverOpened}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <CustomPeriodPopover submitRange={() => setAnchorEl(null)} />
      </Popover>
    </Box>
  );
}

function CustomPeriodPopover({ submitRange }: { submitRange: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<{ from: FormDateTime; to: FormDateTime }>({
    shouldUnregister: true,
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
      onSubmit={handleSubmit(data => {
        submitRange();
        router.replace(
          `/expenses/categories/?${buildCustomPeriodParams(data)}`,
        );
      })}
      p={1.5}
      spacing={1.5}
      sx={{ width: '260px' }}
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
            onChange={handleDatePickerChange(value => {
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
            onChange={handleDatePickerChange(value => {
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
        View Expenses
      </Button>
    </Stack>
  );
}

function tabIdxFromSearchParams(searchParams: ReadonlyURLSearchParams): number {
  const idx = periods.findIndex(period => searchParams.has(period));
  return idx === -1 ? 0 : idx;
}

function defaultPeriodsParam(periodIdx: number) {
  return `?${periods[periodIdx]}=${[dayjs().format('YYYY-MM-DD'), dayjs().startOf('week').format('YYYY-MM-DD'), dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().startOf('year').format('YYYY-MM-DD')][periodIdx]}`;
}

function buildCustomPeriodParams(data: {
  from: FormDateTime;
  to: FormDateTime;
}) {
  return new URLSearchParams({
    [custom]: 'true',
    from: dayjs(data.from).format('YYYY-MM-DD'),
    to: dayjs(data.to).format('YYYY-MM-DD'),
  }).toString();
}
