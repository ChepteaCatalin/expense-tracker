import { getAllCategories } from '@/data/category';
import { UnauthorizedError } from '@/utils/error';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

export default async function CategoriesPage() {
  try {
    var categories = await getAllCategories();
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    notFound();
  }

  return (
    <div>
      <div>
        <Link href="/categories/new">Create new category</Link>
      </div>
      <div style={{ marginTop: '20px' }}>
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/categories/${category.id}/edit`}
            style={{ display: 'block' }}
          >
            {`Edit category "${category.name}"`}
          </Link>
        ))}
      </div>
    </div>
  );
}
