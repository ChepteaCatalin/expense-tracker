'use server';

import { getFormErrors } from '@/lib/zod';
import {
  type Category,
  type CategoryFormErrors,
  type CategoryFormValues,
  type CategoryType,
} from '@/types/category';
import { categorySchema } from './validation';
import { redirect } from 'next/navigation';
import {
  createCategory as createNewCategory,
  updateCategory as updateExistingCategory,
  deleteCategory as deleteExistingCategory,
} from '@/data/category';
import { isUniqueViolationError, UnauthorizedError } from '@/utils/error';
import { categoryIcons } from '@/utils/category-icons';

export async function createCategory(
  _: CategoryFormErrors,
  category: CategoryFormValues,
): Promise<CategoryFormErrors> {
  const errors = getFormErrors(categorySchema, category);
  if (errors) return errors;

  if (!categoryIcons.some(({ src }) => src === category.icon)) {
    return { icon: 'Must be a valid icon' };
  }

  try {
    await createNewCategory(category);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    if (isUniqueViolationError(err)) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to create category' };
  }

  redirect(`/categories/all?type=${category.type}`);
}

export async function updateCategory(
  _: CategoryFormErrors,
  category: Category,
): Promise<CategoryFormErrors> {
  const errors = getFormErrors(categorySchema, category);
  if (errors) return errors;

  if (!categoryIcons.some(({ src }) => src === category.icon)) {
    return { icon: 'Must be a valid icon' };
  }

  try {
    await updateExistingCategory(category);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect('/signin');
    if (isUniqueViolationError(err)) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to update category' };
  }

  redirect(`/categories/all?type=${category.type}`);
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

  redirect(`/categories/all?type=${type}`);
}
