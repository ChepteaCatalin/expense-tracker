'use client';

import CircularProgress from '@mui/material/CircularProgress';
import { useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { custom, getActivePeriodEntry, parsePeriod } from '../../_utils/url';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import type { OpUnitType, ManipulateType } from 'dayjs';
import { useTransition } from 'react';

export default function DateNavButtons() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startNavigation] = useTransition();

  const [period, periodValue] = getActivePeriodEntry(searchParams);

  const navigatePeriod = (offset: -1 | 1) => {
    startNavigation(() => {
      router.push(
        `/expenses/categories?${period}=${dayjs(periodValue)
          .startOf(period as OpUnitType)
          .add(offset, period as ManipulateType)
          .format('YYYY-MM-DD')}`,
      );
    });
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
    >
      {period !== custom && (
        <IconButton
          aria-label="previous"
          disabled={isPending}
          onClick={() => navigatePeriod(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Grid container sx={{ alignItems: 'center', mx: 'auto', gap: 0.75 }}>
        {isPending && <CircularProgress size={14} />}
        <Typography sx={{ color: 'text.secondary' }}>
          {parsePeriod(searchParams)}
        </Typography>
      </Grid>
      {period !== custom && (
        <IconButton
          aria-label="next"
          disabled={isPending}
          onClick={() => navigatePeriod(1)}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}
    </Grid>
  );
}
