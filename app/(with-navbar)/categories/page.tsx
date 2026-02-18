import Link from 'next/link';

export default function CategoryPage() {
  return (
    <div>
      <Link href="/categories/new">Create new category</Link>
    </div>
  );
}
