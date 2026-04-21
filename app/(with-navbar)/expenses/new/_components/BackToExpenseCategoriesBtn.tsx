'use client';

import BackToLink from '@/components/BackToLink';
import dayjs from 'dayjs';

export default function BackToExpenseCategoriesBtn() {
  return (
    <BackToLink
      href={{
        pathname: '/expenses/categories',
        query: { day: dayjs().format('YYYY-MM-DD') },
      }}
      pageName="Expenses by Category"
      sx={{ mb: 0.5 }}
    />
  );
}
