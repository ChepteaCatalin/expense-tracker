'use server';

import { getFormErrors } from '@/lib/zod';
import { CategoryFormErrors, CategoryFormValues } from '@/types/category';
import { categorySchema } from './validation';
import { redirect } from 'next/navigation';
import { createCategory as createNewCategory } from '@/data/category';
import { PostgresErrorCode } from '@/types/error-codes';

export async function createCategory(
  _: CategoryFormErrors,
  category: CategoryFormValues,
): Promise<CategoryFormErrors> {
  const errors = getFormErrors(categorySchema, category);
  if (errors) return errors;

  try {
    await createNewCategory(category);
  } catch (err: any) {
    if (err.code === PostgresErrorCode.UniqueViolation) {
      return { api: 'A category with this name already exists' };
    }
    return { api: 'Failed to create category' };
  }

  //TODO: update/revalidate path?
  //TODO: define the /categories page
  redirect('/categories');
}
