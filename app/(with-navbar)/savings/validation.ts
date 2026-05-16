import { validDate } from '@/lib/MuiDatePicker/utils';
import { amountValidation } from '@/utils/validation';
import z from 'zod';

export const savingsGoalSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Required field')
      .max(100, 'Must be at most 100 characters'),
    initialAmount: z
      .any()
      .refine(v => v !== '', { message: 'Required field' })
      .pipe(
        z
          .number({ message: 'Must be a number' })
          .gte(0, 'Must be zero or greater')
          .lte(10_000_000, "You aren't so rich")
          .refine(v => /^\d+(\.\d{1,2})?$/.test(String(v)), {
            message: 'Must have at most 2 decimal places',
          }),
      ),
    targetAmount: amountValidation,
    currency: z.any().refine(v => !!v?.code, {
      message: 'Required field',
    }),
    startDate: validDate,
    notes: z.string().max(500, 'Must be at most 500 characters'),
  })
  .superRefine(({ initialAmount, targetAmount }, ctx) => {
    if (targetAmount <= initialAmount) {
      ctx.addIssue({
        code: 'custom',
        path: ['targetAmount'],
        message: 'Must be greater than initial amount',
      });
    }
  });
