'use client';

import dayjs from 'dayjs';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(`/expenses/categories?month=${dayjs().format('YYYY-MM-DD')}`);
  return null;
}
