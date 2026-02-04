import z from 'zod';

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters long')
  .max(100, 'Password must be at most 100 characters long')
  .refine(val => !/\s/.test(val), 'Password must not contain spaces');
