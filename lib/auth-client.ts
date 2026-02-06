import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export function signInWithGoogle() {
  return authClient.signIn.social({
    provider: 'google',
  });
}
