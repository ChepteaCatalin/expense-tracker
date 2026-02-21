import { z, type ZodSafeParseResult } from 'zod';

export function getFormErrors<T extends Record<string, any>>(
  schema: z.ZodSchema<T>,
  formValues: T,
): Partial<Record<keyof T, string>> | undefined {
  const parseResult = schema.safeParse(formValues);
  const getError = extractZodError(parseResult);

  if (parseResult.success) return;

  if (!parseResult.success) {
    return Object.keys(formValues).reduce(
      (acc, key) => {
        const err = getError(key);
        if (err) {
          acc[key as keyof T] = err;
        }
        return acc;
      },
      {} as Partial<Record<keyof T, string>>,
    );
  }
}

export const passwordSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(8, `${label} must be at least 8 characters long`)
    .max(128, `${label} must be at most 128 characters long`)
    .refine(val => !/\s/.test(val), `${label} must not contain spaces`);

function extractZodError(safeParseResult: ZodSafeParseResult<unknown>) {
  return (path: string) =>
    safeParseResult.error?.issues.find(err => err.path?.[0] === path)
      ?.message || '';
}
