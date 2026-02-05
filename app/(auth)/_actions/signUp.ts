'use server';

import { extractZodError } from '@/utils/zod';
import { SignUpFormErrors } from '../_types/signUp';
import { signUpSchema } from '../_utils/signUpSchema';

export async function signUp(
  _: SignUpFormErrors,
  data: FormData,
): Promise<SignUpFormErrors> {
  const parseResult = signUpSchema.safeParse({
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    confirmPassword: data.get('confirmPassword'),
  });
  const getError = extractZodError(parseResult);

  if (!parseResult.success) {
    return {
      name: getError('name'),
      email: getError('email'),
      password: getError('password'),
      confirmPassword: getError('confirmPassword'),
    };
  }

  return {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
}
