import { getSession } from '@/data/auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const requireAuth = cache(async () => {
  const session = await getSession();

  if (!session) redirect('/signin');

  return session;
});
