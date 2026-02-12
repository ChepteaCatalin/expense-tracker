import Link from 'next/link';

export default async function RootPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/settings">Go to settings</Link>
    </div>
  );
}
