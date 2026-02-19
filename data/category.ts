import 'server-only';

import { getSession } from './auth';
import { sql } from '@/lib/neon';
import { Category, CategoryFormValues } from '@/types/category';

export async function createCategory(
  category: CategoryFormValues,
): Promise<Category | undefined> {
  const session = await getSession();
  if (!session) return;

  const result = await sql`
    INSERT INTO category (
      name,
      type,
      icon,
      stroke_color,
      background_color,
      user_id
    ) VALUES (
      ${category.name},
      ${category.type},
      ${category.icon},
      ${category.strokeColor},
      ${category.backgroundColor},
      ${session.user.id}
    )
    RETURNING *
  `;

  if (result[0]) return Category.fromDb(result[0]);
}
