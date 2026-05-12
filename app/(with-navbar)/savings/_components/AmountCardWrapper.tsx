'use client';

import Box from '@mui/material/Box';

export default function AmountCardWrapper({
  initialAmount,
  children,
}: {
  initialAmount: number;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${initialAmount !== 0 ? 3 : 2}, 1fr)`,
        '@media (pointer: coarse)': {
          gridTemplateColumns: '1fr',
        },
        gap: 1.5,
      }}
    >
      {children}
    </Box>
  );
}
