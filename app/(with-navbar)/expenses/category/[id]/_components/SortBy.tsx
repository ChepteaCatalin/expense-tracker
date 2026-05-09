'use client';

import { SortTransactionBy } from '@/types/transaction';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useId, useTransition } from 'react';
import { visuallyHidden } from '@mui/utils';
import Grid from '@mui/material/Grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isNavigating, startNavigation] = useTransition();

  const labelId = useId();
  const selectId = useId();

  return (
    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
      <Typography component="span">Sort By:</Typography>
      <FormControl size="small">
        <InputLabel id={labelId} sx={visuallyHidden}>
          Sort By
        </InputLabel>
        <Select
          labelId={labelId}
          id={selectId}
          disabled={isNavigating}
          value={
            searchParams.get('sortBy') || ('date' satisfies SortTransactionBy)
          }
          input={
            <OutlinedInput
              endAdornment={
                isNavigating ? (
                  <InputAdornment position="end" sx={{ mr: 2.5 }}>
                    <CircularProgress size={16} />
                  </InputAdornment>
                ) : null
              }
            />
          }
          onChange={event => {
            const value = event.target.value as SortTransactionBy;

            const params = new URLSearchParams(searchParams.toString());
            params.set('sortBy', value);

            startNavigation(() => {
              router.push(`${pathname}?${params.toString()}`);
            });
          }}
          sx={{ minWidth: '139px' }}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="amount">Amount</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
