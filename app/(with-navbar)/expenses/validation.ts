import z from 'zod';

export const expenseSchema = z.object({
  amount: z
    .any()
    .refine(v => v !== '', { message: 'Required field' })
    .pipe(
      z
        .number({ message: 'Must be a number' })
        .gt(0, 'Must be greater than zero')
        .lte(10_000_000, "You aren't so rich")
        .refine(v => /^\d+(\.\d{1,2})?$/.test(String(v)), {
          message: 'Must have at most 2 decimal places',
        }),
    ),
});
