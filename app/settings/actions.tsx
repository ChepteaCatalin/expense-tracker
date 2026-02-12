'use server';

import { signOut } from '@/data/auth';
import { redirect } from 'next/navigation';

export async function signOutUser() {
  try {
    await signOut();
  } catch (error) {
    return error;
  }

  redirect('/signin');
}
