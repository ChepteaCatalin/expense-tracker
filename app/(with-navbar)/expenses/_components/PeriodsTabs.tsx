'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useId, useState } from 'react';
import { periods } from '../_utils/url';

export default function PeriodsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();

  const [value, setValue] = useState(() =>
    paramToValue(searchParams.get('period') || 'day'),
  );

  return (
    <Box mb={0.75}>
      <Tabs
        value={value}
        onChange={(_event, newValue: number) => {
          setValue(newValue);
          router.replace(`/expenses?period=${valueToParam(newValue)}`);
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
    </Box>
  );
}

function paramToValue(param: string) {
  return periods.indexOf(param as (typeof periods)[number]);
}

function valueToParam(value: number) {
  return periods[value];
}
