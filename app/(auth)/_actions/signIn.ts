'use server';

import { SignInFormErrors } from '../_types/signIn';
import { signInSchema } from '../_utils/signInSchema';
import { extractZodError } from '@/utils/zod';

export async function signIn(
  _: SignInFormErrors,
  data: FormData,
): Promise<SignInFormErrors> {
  const parseResult = signInSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
  });
  const getError = extractZodError(parseResult);

  if (!parseResult.success) {
    return {
      email: getError('email'),
      password: getError('password'),
    };
  }

  return { email: '', password: '' };
}
