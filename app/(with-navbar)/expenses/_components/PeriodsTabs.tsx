'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useId, useState } from 'react';
import { periods } from '../_utils/url';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function PeriodsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();

  const [value, setValue] = useState(() =>
    paramToValue(searchParams.get('period') || 'day'),
  );
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );

  const popoverOpened = Boolean(anchorEl);
  const popoverId = popoverOpened ? 'popover' + id : undefined;

  return (
    <Box mb={0.75}>
      <Tabs
        value={value}
        onChange={(event, newValue: number) => {
          setValue(newValue);
          if (newValue == 4) setAnchorEl(event.currentTarget);
          else
            router.replace(
              `/expenses/categories/?period=${valueToParam(newValue)}`,
            );
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
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}

function paramToValue(param: string) {
  return periods.indexOf(param as (typeof periods)[number]);
}

function valueToParam(value: number) {
  return periods[value];
}
