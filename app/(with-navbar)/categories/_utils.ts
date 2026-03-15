import { CategoryType } from '@/types/category';

export function isValidCategoryType(value: string): value is CategoryType {
  const VALID_CATEGORY_TYPES: CategoryType[] = ['expense', 'income'];

  return VALID_CATEGORY_TYPES.includes(value as CategoryType);
}
