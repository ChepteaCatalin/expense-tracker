'use server';

import { auth } from '@/lib/auth';
import { SignInFormErrors } from '../_types/signIn';
import { signInSchema } from '../_utils/signInSchema';
import { extractZodError } from '@/utils/zod';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signIn(
  _: SignInFormErrors,
  data: FormData,
): Promise<SignInFormErrors> {
  const email = data.get('email') as string;
  const password = data.get('password') as string;

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
    await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: await headers(),
    });
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
