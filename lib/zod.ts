import type { ZodSafeParseResult } from 'zod';

export function extractZodError(safeParseResult: ZodSafeParseResult<unknown>) {
  return (path: string) =>
    safeParseResult.error?.issues.find(err => err.path?.[0] === path)
      ?.message || '';
}
