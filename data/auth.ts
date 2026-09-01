import "server-only";

import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export const refreshSession = cache(async () =>
  auth.api.getSession({
    query: { disableCookieCache: true },
    headers: await headers(),
  }),
);

export async function signInEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return auth.api.signInEmail({
    body: { email, password, rememberMe: true },
    headers: await headers(),
  });
}

export function signUpEmail({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return auth.api.signUpEmail({
    body: { name, email, password },
  });
}

export async function signOut() {
  return auth.api.signOut({ headers: await headers() });
}

export async function changePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  return auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    },
    headers: await headers(),
  });
}

export async function deleteUser() {
  return auth.api.deleteUser({
    body: {},
    headers: await headers(),
  });
}
