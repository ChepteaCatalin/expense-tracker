import "server-only";

import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Server actions change data, so they check the session in the database rather
// than trusting the 5-minute cookie cache: a revoked session (sign-out, password
// change) must stop working immediately. Server Components cannot set cookies,
// so renewing the session while a page renders would extend it in the database
// but not in the browser; only server actions renew it here, and page views
// renew it through `SessionRenewal`.
export const getSession = cache(async () => {
  const requestHeaders = await headers();
  const isServerAction = requestHeaders.has("next-action");

  return auth.api.getSession({
    query: {
      disableCookieCache: isServerAction,
      disableRefresh: !isServerAction,
    },
    headers: requestHeaders,
  });
});

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

export async function signUpEmail({
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
    headers: await headers(),
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
