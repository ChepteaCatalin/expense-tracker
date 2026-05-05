'use client';

import NavigateBackBtn from '@/components/NavigateBackBtn';
import dayjs from 'dayjs';

export default function FormNavigateBackBtn() {
  return (
    <NavigateBackBtn
      fallbackHref={`/incomes/categories?month=${dayjs().format('YYYY-MM-DD')}`} //TODO: check if the link works correctly
    />
  );
}
