'use server';

import { extractZodError } from '@/lib/zod';
import { CategoryFormErrors, CategoryFormValues } from './types';
import { categorySchema } from './validation';
import { redirect } from 'next/navigation';

export async function createCategory(
  _: CategoryFormErrors,
  category: CategoryFormValues,
): Promise<CategoryFormErrors> {
  const parseResult = categorySchema.safeParse(category);
  const getError = extractZodError(parseResult);

  if (!parseResult.success) {
    return {
      name: getError('name'),
      type: getError('type'),
      icon: getError('icon'),
      strokeColor: getError('strokeColor'),
      backgroundColor: getError('backgroundColor'),
    };
  }

  try {
  } catch {
    return { api: 'Failed to create category' };
  }

  //TODO: update/revalidate path?
  redirect('/categories');
}
