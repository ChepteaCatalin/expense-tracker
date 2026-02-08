'use server';

import { signUpEmail } from '@/data/auth';
import { extractZodError } from '@/utils/zod';
import { SignUpFormErrors, SignUpFormValues } from '../_types/signUp';
import { signUpSchema } from '../_utils/signUpSchema';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

export async function signUp(
  _: SignUpFormErrors,
  { name, email, password, confirmPassword }: SignUpFormValues,
): Promise<SignUpFormErrors> {
  const parseResult = signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });
  const getError = extractZodError(parseResult);

  if (!parseResult.success) {
    return {
      api: '',
      name: getError('name'),
      email: getError('email'),
      password: getError('password'),
      confirmPassword: getError('confirmPassword'),
    };
  }

  try {
    await signUpEmail({ name, email, password });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        api: error.message,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    }
  }

  redirect('/');
}
