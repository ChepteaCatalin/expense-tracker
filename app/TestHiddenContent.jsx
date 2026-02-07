import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

//TODO: remove this file
export default async function TestHiddenContent() {
  //TODO: move this in data access layer
  console.log('headers', await headers());
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch(err => {
      console.log('Error fetching session:', err);
    });
  console.log('🚀 ~ session:', session);
  if (!session) redirect('/signin');

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
