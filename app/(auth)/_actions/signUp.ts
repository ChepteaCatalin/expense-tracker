'use server';

import { extractZodError } from '@/utils/zod';
import { SignUpFormErrors } from '../_types/signUp';
import { signUpSchema } from '../_utils/signUpSchema';
import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';

export async function signUp(
  _: SignUpFormErrors,
  data: FormData,
): Promise<SignUpFormErrors> {
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  const parseResult = signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword: data.get('confirmPassword'),
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
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
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

  return {
    api: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
}
