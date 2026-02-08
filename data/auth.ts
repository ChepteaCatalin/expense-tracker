import 'server-only';

import { cache } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const signInEmail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return auth.api.signInEmail({
    body: { email, password, rememberMe: true },
  });
};

export const signUpEmail = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return auth.api.signUpEmail({
    body: { name, email, password },
  });
};
