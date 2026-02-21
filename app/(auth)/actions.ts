'use server';

import { signInEmail, signUpEmail } from '@/data/auth';
import {
  SignInFormErrors,
  SignInFormValues,
  SignUpFormErrors,
  SignUpFormValues,
} from './types';
import { signInSchema, signUpSchema } from './validation';
import { getFormErrors } from '@/lib/zod';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

export async function signUp(
  _: SignUpFormErrors,
  formValues: SignUpFormValues,
): Promise<SignUpFormErrors> {
  const errors = getFormErrors(signUpSchema, formValues);
  if (errors) return errors;

  try {
    await signUpEmail(formValues);
  } catch (error) {
    if (error instanceof APIError) {
      return { api: error.message };
    }
  }

  redirect('/');
}

export async function signIn(
  _: SignInFormErrors,
  formValues: SignInFormValues,
): Promise<SignInFormErrors> {
  const errors = getFormErrors(signInSchema, formValues);
  if (errors) return errors;

  try {
    await signInEmail(formValues);
  } catch (error) {
    if (error instanceof APIError) {
      return { api: error.message };
    }
  }

  redirect('/');
}
