import { passwordSchema } from '@/lib/zod';
import z from 'zod';

const emailSchema = z.email('Invalid email address');

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(255, 'Name must be at most 255 characters long'),
    email: emailSchema,
    password: passwordSchema('Password'),
    confirmPassword: passwordSchema('Confirm Password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema('Password'),
});
