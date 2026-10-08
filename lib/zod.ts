import { z, type ZodSafeParseResult } from "zod";

type FieldErrors<Values> = Partial<Record<keyof Values, string>>;

export type ParseFormResult<Schema extends z.ZodType> =
  | { success: true; data: z.output<Schema> }
  | { success: false; errors: FieldErrors<z.input<Schema>> };

export function parseForm<Schema extends z.ZodType<unknown, object>>(
  schema: Schema,
  formValues: z.input<Schema>,
): ParseFormResult<Schema> {
  const parseResult = schema.safeParse(formValues);

  if (parseResult.success) return { success: true, data: parseResult.data };

  const getError = extractZodError(parseResult);
  const errors: FieldErrors<z.input<Schema>> = {};

  for (const key of Object.keys(formValues) as Array<
    keyof z.input<Schema> & string
  >) {
    const err = getError(key);
    if (err) errors[key] = err;
  }

  return { success: false, errors };
}

export function getFormErrors<Schema extends z.ZodType<unknown, object>>(
  schema: Schema,
  formValues: z.input<Schema>,
): FieldErrors<z.input<Schema>> | undefined {
  const result = parseForm(schema, formValues);
  return result.success ? undefined : result.errors;
}

export const passwordSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(8, `${label} must be at least 8 characters long`)
    .max(128, `${label} must be at most 128 characters long`)
    .refine((val) => !/\s/.test(val), `${label} must not contain spaces`);

export const newPasswordSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .refine((val) => !/\s/.test(val), `${label} must not contain spaces`)
    .min(8, `${label} must be at least 8 characters long`)
    .max(128, `${label} must be at most 128 characters long`);

function extractZodError(safeParseResult: ZodSafeParseResult<unknown>) {
  return (path: string) =>
    safeParseResult.error?.issues.find((err) => err.path?.[0] === path)
      ?.message || "";
}
