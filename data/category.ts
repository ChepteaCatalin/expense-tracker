import 'server-only';

import { sql } from '@/lib/neon';
import type {
  Category,
  CategoryFormValues,
  CategoryType,
} from '@/types/category';
import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { authGuard } from '@/lib/auth-utils';
import { userTag } from '@/utils/cache';

export const createCategory = authGuard(
  session =>
    async (category: CategoryFormValues): Promise<Category> => {
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

      if (!result[0]) throw new Error('Failed to create category');

      updateTag(userTag(session.user.id)(`categories/type/${category.type}`));

      return categoryFromDb(result[0]);
    },
);

export const updateCategory = authGuard(
  session =>
    async (category: Category): Promise<Category> => {
      const result = await sql`
        UPDATE category 
        SET 
          name = ${category.name},
          icon = ${category.icon},
          stroke_color = ${category.strokeColor},
          background_color = ${category.backgroundColor},
          updated_at = NOW()
        WHERE id = ${category.id} AND user_id = ${session.user.id}
        RETURNING *
      `;

      if (!result[0]) throw new Error('Category not found or update failed');

      const tag = userTag(session.user.id);
      updateTag(tag(`categories/type/${category.type}`));
      updateTag(tag(`categories/id/${category.id}`));

      return categoryFromDb(result[0]);
    },
);

export const deleteCategory = authGuard(
  session => async (categoryId: number) => {
    const result = await sql`
      DELETE FROM category
      WHERE id = ${categoryId} AND user_id = ${session.user.id}
      RETURNING id, type
    `;

    if (!result[0]) throw new Error('Category not found or delete failed');

    const tag = userTag(session.user.id);
    updateTag(tag(`categories/type/${result[0].type}`));
    updateTag(tag(`categories/id/${categoryId}`));
  },
);

export const getAllCategoriesByType = authGuard(
  session =>
    async (type: CategoryType): Promise<Category[] | Array<never>> => {
      'use cache';
      cacheLife('weeks');
      cacheTag(userTag(session.user.id)(`categories/type/${type}`));

      const result = await sql`
        SELECT 
          id,
          name,
          type,
          icon,
          stroke_color,
          background_color,
          user_id,
          created_at,
          updated_at
        FROM category
        WHERE user_id = ${session.user.id} AND type = ${type}
        ORDER BY LOWER(name) ASC
      `;

      if (!result?.length) return [];
      return result.map(categoryFromDb);
    },
);

export const getCategoryById = authGuard(
  session =>
    async (categoryId: number): Promise<Category | undefined> => {
      'use cache';
      cacheLife('weeks');
      cacheTag(userTag(session.user.id)(`categories/id/${categoryId}`));

      const result = await sql`
        SELECT 
          id,
          name,
          type,
          icon,
          stroke_color,
          background_color,
          user_id,
          created_at,
          updated_at
        FROM category
        WHERE id = ${categoryId} AND user_id = ${session.user.id}
      `;

      if (result[0]) return categoryFromDb(result[0]);
    },
);

export const getCategoryNameById = authGuard(
  session =>
    async (categoryId: number): Promise<string | undefined> => {
      'use cache';
      cacheLife('weeks');
      cacheTag(userTag(session.user.id)(`categories/id/${categoryId}`));

      const result = await sql`
        SELECT name
        FROM category
        WHERE id = ${categoryId} AND user_id = ${session.user.id}
      `;

      return result[0]?.name;
    },
);

function categoryFromDb(dbResult: Record<string, any>): Category {
  return {
    id: dbResult.id,
    name: dbResult.name,
    type: dbResult.type,
    icon: dbResult.icon,
    strokeColor: dbResult.stroke_color,
    backgroundColor: dbResult.background_color,
    createdAt: new Date(dbResult.created_at),
    updatedAt: new Date(dbResult.updated_at),
  };
}
