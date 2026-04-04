'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { custom, day, month, periods, week, year } from '../_utils/url';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import type { OpUnitType, ManipulateType } from 'dayjs';

export default function DateNavButtons() {
  const searchParams = useSearchParams();
  const [period, periodValue] = getActivePeriodEntry(searchParams);
  const router = useRouter();

  return (
    <Grid
      container
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      {period !== custom && (
        <IconButton
          aria-label="previous"
          onClick={() => {
            router.replace(
              `/expenses/categories?${period}=${dayjs(periodValue)
                .startOf(period as OpUnitType)
                .add(-1, period as ManipulateType)
                .format('YYYY-MM-DD')}`,
            );
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography color="text.secondary" mx="auto">
        {parsePeriod(searchParams)}
      </Typography>
      {period !== custom && (
        <IconButton
          aria-label="next"
          onClick={() => {
            router.replace(
              `/expenses/categories?${period}=${dayjs(periodValue)
                .startOf(period as OpUnitType)
                .add(1, period as ManipulateType)
                .format('YYYY-MM-DD')}`,
            );
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}
    </Grid>
  );
}

function parsePeriod(searchParams: ReadonlyURLSearchParams): string {
  const [period, periodValue] = getActivePeriodEntry(searchParams);

  if (!period) return '';
  if (period === custom) {
    return (
      dayjs(searchParams.get('from')).format('D MMM YYYY') +
      ' - ' +
      dayjs(searchParams.get('to')).format('D MMM YYYY')
    );
  }

  return (
    {
      [day]: dayjs(periodValue).format('ddd D MMM YYYY'),
      [week]:
        dayjs(periodValue).startOf('week').format('D MMM') +
        ' - ' +
        dayjs(periodValue).endOf('week').format('D MMM YYYY'),
      [month]: dayjs(periodValue).startOf('month').format('MMM YYYY'),
      [year]: dayjs(periodValue).startOf('year').format('YYYY'),
    }[period] || ''
  );
}

function getActivePeriodEntry(
  searchParams: ReadonlyURLSearchParams,
): [string, string] | [] {
  return (
    Array.from(searchParams.entries()).find(([key]) =>
      periods.includes(key as (typeof periods)[number]),
    ) || []
  );
}
