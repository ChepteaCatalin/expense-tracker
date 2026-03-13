'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Category from '@mui/icons-material/Category';

export default function ManageCategoriesBtn() {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      startIcon={<Category />}
      onClick={() => router.push('/categories/expense')}
    >
      Manage Expense and Income Categories
    </Button>
  );
}
