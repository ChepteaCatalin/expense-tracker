'use server';

import { changePassword, signOut } from '@/data/auth';
import { redirect } from 'next/navigation';
import { ChangePasswordFormErrors, ChangePasswordFormValues } from './types';
import { changePasswordSchema } from './validation';
import { extractZodError } from '@/lib/zod';
import { APIError } from 'better-auth';

export async function signOutUser() {
  try {
    await signOut();
  } catch (error) {
    return error;
  }

  redirect('/signin');
}

export async function updatePassword(
  _: ChangePasswordFormErrors,
  {
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: ChangePasswordFormValues,
): Promise<ChangePasswordFormErrors> {
  const parseResult = changePasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
  const getError = extractZodError(parseResult);

  if (!parseResult.success) {
    return {
      currentPassword: getError('currentPassword'),
      newPassword: getError('newPassword'),
      confirmNewPassword: getError('confirmNewPassword'),
    };
  }

  try {
    await changePassword({ currentPassword, newPassword });
    await signOut();
  } catch (error) {
    if (error instanceof APIError) return { api: error.message };
  }

  redirect('/signin');
}
