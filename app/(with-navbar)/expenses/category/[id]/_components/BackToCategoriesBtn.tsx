'use client';

import BackToLink from '@/components/BackToLink';
import { useSearchParams } from 'next/navigation';

export default function BackToCategoriesBtn() {
  const searchParams = useSearchParams();

  const backBtnSearchParams = new URLSearchParams(searchParams.toString());
  backBtnSearchParams.delete('sortBy');

  return (
    <BackToLink
      href={`/expenses/categories?${backBtnSearchParams.toString()}`}
    />
  );
}
