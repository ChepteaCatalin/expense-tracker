'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      `/expenses/categories?month=${dayjs().format('YYYY-MM-DD')}`,
    );
  }, [router]);
}
