'use server';

import { getFormErrors } from '@/lib/zod';
import {
  Category,
  CategoryFormErrors,
  CategoryFormValues,
} from '@/types/category';
import { categorySchema } from './validation';
import { redirect } from 'next/navigation';
import {
  createCategory as createNewCategory,
  updateCategory as updateExistingCategory,
} from '@/data/category';
import { PostgresErrorCode } from '@/types/error-codes';
import { UnauthorizedError } from '@/utils/error';
import { revalidateTag, updateTag } from 'next/cache';

export async function createCategory(
  _: CategoryFormErrors,
  category: CategoryFormValues,
): Promise<CategoryFormErrors> {
  const errors = getFormErrors(categorySchema, category);
  if (errors) return errors;

  try {
    await createNewCategory(category);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    if (err.code === PostgresErrorCode.UniqueViolation) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to create category' };
  }

  revalidateTag('categories', 'max');
  redirect('/categories');
}

export async function updateCategory(
  _: CategoryFormErrors,
  category: Category,
): Promise<CategoryFormErrors> {
  const errors = getFormErrors(categorySchema, category);
  if (errors) return errors;

  try {
    await updateExistingCategory(category);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    if (err.code === PostgresErrorCode.UniqueViolation) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to update category' };
  }

  updateTag(`categories`);
  updateTag(`categories/${category.id}`);
  redirect('/categories');
}
