import { validDate } from '@/lib/MuiDatePicker/utils';
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
  categoryId: z
    .any()
    .refine(v => v !== '', { message: 'Category is required' })
    .pipe(
      z
        .number({ message: 'Category id must be a number' })
        .int('Category id must be an integer')
        .gt(0, 'Category id must be greater than zero'),
    ),
  date: validDate,
});
