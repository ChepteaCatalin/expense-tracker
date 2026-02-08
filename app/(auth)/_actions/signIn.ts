'use server';

import { signInEmail } from '@/data/auth';
import { SignInFormErrors, SignInFormValues } from '../_types/signIn';
import { signInSchema } from '../_utils/signInSchema';
import { extractZodError } from '@/utils/zod';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

export async function signIn(
  _: SignInFormErrors,
  { email, password }: SignInFormValues,
): Promise<SignInFormErrors> {
  const parseResult = signInSchema.safeParse({
    email,
    password,
  });
  const getError = extractZodError(parseResult);

  if (!parseResult.success) {
    return {
      api: '',
      email: getError('email'),
      password: getError('password'),
    };
  }

  try {
    await signInEmail({ email, password });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        api: error.message,
        email: '',
        password: '',
      };
    }
  }

  redirect('/');
}
