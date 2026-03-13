'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { CategoryType } from '@/types/category';

const DEFAULT_CATEGORY_TYPE: CategoryType = 'expense';

export default function ManageCategoriesBtn() {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      onClick={() => router.push(`/categories/type/${DEFAULT_CATEGORY_TYPE}`)}
    >
      Manage Expense and Income Categories
    </Button>
  );
}
