import z from 'zod';

const passwordSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .min(6, `${label} must be at least 6 characters long`)
    .max(100, `${label} must be at most 100 characters long`)
    .refine(val => !/\s/.test(val), `${label} must not contain spaces`);

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters long')
      .max(100, 'Name must be at most 100 characters long'),
    email: z.email('Invalid email address'),
    password: passwordSchema('Password'),
    confirmPassword: passwordSchema('Confirm Password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
