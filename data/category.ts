import 'server-only';

import { getSession } from './auth';
import { sql } from '@/lib/neon';
import { Category, CategoryFormValues } from '@/types/category';
import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { UnauthorizedError } from '@/utils/error';

export async function createCategory(
  category: CategoryFormValues,
): Promise<Category | undefined> {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();

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

  if (result[0]) return categoryFromDb(result[0]);
}

export async function getAllCategories() {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();

  return queryAllCategories(session.user.id);
}

const queryAllCategories = cache(
  async (userId: string): Promise<Category[] | Array<never>> => {
    'use cache';
    cacheLife('weeks');
    cacheTag(`categories`);

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
    WHERE user_id = ${userId}
  `;

    if (!result?.length) return [];
    return result.map(categoryFromDb);
  },
);

export async function getCategoryById(categoryId: number) {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();

  return queryCategoryById(session.user.id, categoryId);
}

const queryCategoryById = cache(
  async (userId: string, categoryId: number): Promise<Category | undefined> => {
    'use cache';
    cacheLife('weeks');
    cacheTag(`categories/${categoryId}`);

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
    WHERE id = ${categoryId} AND user_id = ${userId}
  `;

    if (result[0]) return categoryFromDb(result[0]);
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
    userId: dbResult.user_id,
    createdAt: new Date(dbResult.created_at),
    updatedAt: new Date(dbResult.updated_at),
  };
}
