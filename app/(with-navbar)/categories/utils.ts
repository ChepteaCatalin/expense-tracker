import { type CategoryType } from '@/types/category';

export function isValidCategoryType(
  value: string | null | undefined,
): value is CategoryType {
  if (!value) return false;

  const VALID_CATEGORY_TYPES: CategoryType[] = ['expense', 'income'];

  return VALID_CATEGORY_TYPES.includes(value as CategoryType);
}
