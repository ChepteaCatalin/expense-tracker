'use server';

import { getFormErrors } from '@/lib/zod';
import {
  Category,
  CategoryFormErrors,
  CategoryFormValues,
  CategoryType,
} from '@/types/category';
import { categorySchema } from './validation';
import { redirect } from 'next/navigation';
import {
  createCategory as createNewCategory,
  updateCategory as updateExistingCategory,
  deleteCategory as deleteExistingCategory,
} from '@/data/category';
import { isUniqueViolationError, UnauthorizedError } from '@/utils/error';

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
    if (isUniqueViolationError(err)) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to create category' };
  }

  redirect(`/categories/type/${category.type}`);
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
    if (isUniqueViolationError(err)) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to update category' };
  }

  redirect(`/categories/type/${category.type}`);
}

export async function deleteCategory(
  _: string,
  { id, type }: { id: number; type: CategoryType },
) {
  try {
    await deleteExistingCategory(id);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    return 'Failed to delete category';
  }

  redirect(`/categories/type/${type}`);
}
