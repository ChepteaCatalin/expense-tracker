import type { ZodSafeParseResult } from 'zod';

export function extractZodError(parseResult: ZodSafeParseResult<unknown>) {
  return (path: string) =>
    parseResult.error?.issues.find(err => err.path?.[0] === path)?.message ||
    '';
}
