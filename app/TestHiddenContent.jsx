import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

//TODO: remove this file
export default async function TestHiddenContent() {
  //TODO: move this in data access layer
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect('/signin');

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
