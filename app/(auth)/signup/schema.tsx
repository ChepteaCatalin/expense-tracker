import z from 'zod';

const passwordSchema = z
  .string()
  .trim()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters long')
  .max(100, 'Password must be at most 100 characters long');

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .min(3, 'Name must be at least 3 characters long')
      .max(100, 'Name must be at most 100 characters long'),
    email: z.email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
