'use client';

import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

export default function AddIncomeLinkBtn() {
  return (
    <Link href={`/incomes/categories?month=${dayjs().format('YYYY-MM-DD')}`}>
      <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
        Add Income
      </Button>
    </Link>
  );
}
