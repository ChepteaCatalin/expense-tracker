import z from 'zod';

const emailSchema = z.email('Invalid email address');
const passwordSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .min(8, `${label} must be at least 8 characters long`)
    .max(128, `${label} must be at most 128 characters long`)
    .refine(val => !/\s/.test(val), `${label} must not contain spaces`);

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
