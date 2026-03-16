'use client';

import Box from '@mui/material/Box';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LinkLabel({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = `${pathname}?${searchParams.toString()}` === href;

  return (
    <Box
      sx={{
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: 700,
        p: '8px',
        color: isActive ? '#1ed760' : 'rgb(227, 227, 227)',
        backgroundColor: isActive ? 'rgba(30, 215, 96, 0.1)' : 'transparent',
        boxShadow: isActive ? '0 1px 5px rgba(30, 215, 96, 0.16)' : 'none',
        transition:
          'color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          color: '#1ed760',
          backgroundColor: 'rgba(30, 215, 96, 0.06)',
        },
      }}
    >
      {text}
    </Box>
  );
}
