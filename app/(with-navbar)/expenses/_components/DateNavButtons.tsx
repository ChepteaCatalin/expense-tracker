'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';

export default function DateNavButtons() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') || 'day';
  const diff = searchParams.get('diff') || '0';
  const router = useRouter();

  return (
    <>
      <IconButton
        aria-label="previous"
        onClick={() => {
          router.replace(
            `/expenses/categories?period=${period}&diff=${parseDiff(diff) - 1}`,
          );
        }}
        sx={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        aria-label="next"
        onClick={() => {
          router.replace(
            `/expenses/categories?period=${period}&diff=${parseDiff(diff) + 1}`,
          );
        }}
        sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </>
  );
}

function parseDiff(diff: string | null): number {
  return diff ? parseInt(diff, 10) : 0;
}
