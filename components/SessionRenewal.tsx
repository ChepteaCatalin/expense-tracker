"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { sessionRenewalDueAt } from "@/lib/session-config";

const RENEWAL_DUE_AT_KEY = "session-renewal-due-at";

function readDueAt() {
  try {
    return Number(localStorage.getItem(RENEWAL_DUE_AT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeDueAt(dueAt: number) {
  try {
    localStorage.setItem(RENEWAL_DUE_AT_KEY, String(dueAt));
  } catch {}
}

// Server Components cannot set cookies, so the session is not renewed while
// pages render. Once it is due (at most once a day), the browser renews it
// through the auth route handler, which can. Page loads add no server work.
export default function SessionRenewal() {
  useEffect(() => {
    let pending = false;

    async function renewIfDue() {
      if (pending || readDueAt() > Date.now()) return;

      pending = true;
      try {
        // Bypass the cookie cache so the session is renewed in the database.
        const { data } = await authClient.getSession({
          query: { disableCookieCache: true },
        });
        if (data) writeDueAt(sessionRenewalDueAt(data.session.expiresAt));
      } finally {
        pending = false;
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") renewIfDue();
    }

    renewIfDue();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return null;
}
