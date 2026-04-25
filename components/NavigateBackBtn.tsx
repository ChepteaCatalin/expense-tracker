'use client';

import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import type { SxProps, Theme } from '@mui/material/styles';

export default function NavigateBackBtn({
  pageName,
  sx,
}: {
  pageName?: string;
  sx?: SxProps<Theme>;
}) {
  const router = useRouter();

  return (
    <Button
      sx={{
        py: 0,
        px: 0.5,
        '& .MuiButton-startIcon': { mr: 0.5 },
        mb: 0.5,
        ...sx,
      }}
      startIcon={<ChevronLeftIcon />}
      onClick={() => router.back()}
    >
      {pageName ? `Back to ${pageName}` : 'Back'}
    </Button>
  );
}
