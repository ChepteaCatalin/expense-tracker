// Sliding session, the same for email/password and Google sign-ins: it expires
// 7 days after it was last renewed and is renewed at most once a day while the
// user keeps using the app (see `components/SessionRenewal.tsx`).
export const SESSION_EXPIRES_IN = 7 * 24 * 60 * 60;
export const SESSION_UPDATE_AGE = 24 * 60 * 60;

/** When a session with the given expiry becomes due for renewal (ms). */
export function sessionRenewalDueAt(expiresAt: Date | string) {
  return (
    new Date(expiresAt).getTime() -
    (SESSION_EXPIRES_IN - SESSION_UPDATE_AGE) * 1000
  );
}
