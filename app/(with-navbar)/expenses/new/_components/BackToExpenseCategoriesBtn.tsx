'use client';

import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';

export default function BackToExpenseCategoriesBtn() {
  const router = useRouter();

  return (
    <Button
      sx={{ py: 0, px: 0.5, '& .MuiButton-startIcon': { mr: 0.5 }, mb: 0.5 }}
      startIcon={<ChevronLeftIcon />}
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
}
