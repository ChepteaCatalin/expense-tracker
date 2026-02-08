'use server';

import { signInEmail, signUpEmail } from '@/data/auth';
import {
  SignInFormErrors,
  SignInFormValues,
  SignUpFormErrors,
  SignUpFormValues,
} from './types';
import { signInSchema, signUpSchema } from './validation';
import { extractZodError } from '@/lib/zod';
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
      return { api: error.message };
    }
  }

  redirect('/');
}

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
      email: getError('email'),
      password: getError('password'),
    };
  }

  try {
    await signInEmail({ email, password });
  } catch (error) {
    if (error instanceof APIError) {
      return { api: error.message };
    }
  }

  redirect('/');
}
