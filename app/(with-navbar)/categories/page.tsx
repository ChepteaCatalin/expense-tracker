import Link from 'next/link';

export default function CategoryPage() {
  return (
    <div>
      <div>
        <Link href="/categories/new">Create new category</Link>
      </div>
      <div>
        <Link href="/categories/1/edit">Edit category 1</Link>
      </div>
    </div>
  );
}
