'use server';

import { changePassword, signOut as signOutUser } from '@/data/auth';
import { redirect } from 'next/navigation';
import {
  ChangeCurrencyError,
  ChangePasswordFormErrors,
  ChangePasswordFormValues,
} from './types';
import { changePasswordSchema } from './validation';
import { extractZodError } from '@/lib/zod';
import { APIError } from 'better-auth';
import { currencies, updateCurrency as changeCurrency } from '@/data/currency';
import { revalidatePath } from 'next/cache';

export async function signOut() {
  try {
    await signOutUser();
  } catch (error) {
    return error;
  }

  revalidatePath('/', 'layout');
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

export async function updateCurrency(_: ChangeCurrencyError, currency: string) {
  if (!currency || !currencies.find(c => c.code === currency)) {
    return { currency: 'Invalid currency' };
  }

  try {
    await changeCurrency(currency);
  } catch {
    return { api: 'Failed to update currency' };
  }

  return {};
}
