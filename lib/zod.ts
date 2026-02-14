import { z, type ZodSafeParseResult } from 'zod';

export function extractZodError(safeParseResult: ZodSafeParseResult<unknown>) {
  return (path: string) =>
    safeParseResult.error?.issues.find(err => err.path?.[0] === path)
      ?.message || '';
}

export const passwordSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(8, `${label} must be at least 8 characters long`)
    .max(128, `${label} must be at most 128 characters long`)
    .refine(val => !/\s/.test(val), `${label} must not contain spaces`);
