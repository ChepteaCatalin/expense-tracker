import z from 'zod';

export const expenseSchema = z.object({
  amount: z.number(),
});
