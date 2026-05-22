import { notFound } from 'next/navigation';
import Link from 'next/link';
import { validIdParam } from '@/utils/url';

export default async function SavingsGoalDetailsPage({
  params,
}: PageProps<'/savings/[id]/details'>) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  return (
    <div>
      <p>Savings Goal Details</p>

      <Link href="/savings/33/edit">Edit 33</Link>
    </div>
  );
}
