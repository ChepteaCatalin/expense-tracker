'use client';

import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import {
  customPeriod,
  dayPeriod,
  monthPeriod,
  weekPeriod,
  yearPeriod,
} from '../_utils/url';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

export default function DateNavButtons() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') || 'day';
  const diff = searchParams.get('diff') || '0';
  const router = useRouter();

  return (
    <Grid
      container
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      {period !== customPeriod && (
        <IconButton
          aria-label="previous"
          onClick={() => {
            router.replace(
              `/expenses/categories?period=${period}&diff=${parseDiff(diff) - 1}`,
            );
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography color="text.secondary" mx="auto">
        {parsePeriod(searchParams)}
      </Typography>
      {period !== customPeriod && (
        <IconButton
          aria-label="next"
          onClick={() => {
            router.replace(
              `/expenses/categories?period=${period}&diff=${parseDiff(diff) + 1}`,
            );
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}
    </Grid>
  );
}

function parseDiff(diff: string | null): number {
  return diff ? parseInt(diff, 10) : 0;
}

function parsePeriod(searchParams: ReadonlyURLSearchParams): string {
  const period = searchParams.get('period') || 'day';
  const diff = parseDiff(searchParams.get('diff'));

  return (
    {
      [dayPeriod]: dayjs().add(diff, 'day').format('ddd D MMM YYYY'),
      [weekPeriod]:
        dayjs().add(diff, 'week').startOf('week').format('D MMM') +
        ' - ' +
        dayjs().add(diff, 'week').endOf('week').format('D MMM YYYY'),
      [monthPeriod]: dayjs().add(diff, 'month').format('MMM YYYY'),
      [yearPeriod]: dayjs().add(diff, 'year').format('YYYY'),
      [customPeriod]:
        dayjs(searchParams.get('from')).format('D MMM YYYY') +
        ' - ' +
        dayjs(searchParams.get('to')).format('D MMM YYYY'),
    }[period] || ''
  );
}
