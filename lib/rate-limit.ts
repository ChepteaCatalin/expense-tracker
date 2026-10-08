import "server-only";

import { createHmac } from "node:crypto";
import type { BetterAuthOptions } from "better-auth";
import { sql } from "@/lib/neon";

type RateLimitStorage = NonNullable<
  NonNullable<BetterAuthOptions["rateLimit"]>["customStorage"]
>;

export interface RateLimitRule {
  /** Window length in seconds. */
  window: number;
  /** Maximum number of requests allowed within the window. */
  max: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the current window resets, when not allowed. */
  retryAfter: number | null;
}

export const STALE_ENTRY_TTL_MS = 24 * 60 * 60 * 1000;
const PRUNE_PROBABILITY = 0.01;

// Keyed with the server secret so stored keys can't be reversed by
// brute-forcing the small IP address / email space (data minimisation).
export function hashRateLimitKey(value: string): string {
  return createHmac("sha256", process.env.BETTER_AUTH_SECRET ?? "")
    .update(value)
    .digest("hex");
}

/**
 * Atomically records a request against `key` using a fixed-window counter
 * stored in Postgres, so limits are shared across serverless instances.
 *
 * Fails open (allows the request) if the store is unavailable, so a database
 * hiccup or a missing migration never locks users out of the app.
 */
export async function consumeRateLimit(
  key: string,
  { window, max }: RateLimitRule,
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = window * 1000;
  const expiredBefore = now - windowMs;

  try {
    const [row] = await sql<{ count: number; window_start: string }>`
      INSERT INTO rate_limit AS r (key, count, window_start)
      VALUES (${key}, 1, ${now})
      ON CONFLICT (key) DO UPDATE SET
        count = CASE
          WHEN r.window_start <= ${expiredBefore} THEN 1
          ELSE r.count + 1
        END,
        window_start = CASE
          WHEN r.window_start <= ${expiredBefore} THEN ${now}
          ELSE r.window_start
        END
      RETURNING count, window_start
    `;

    if (!row) return { allowed: true, retryAfter: null };

    const count = Number(row.count);
    const windowStart = Number(row.window_start);

    if (count === 1 && Math.random() < PRUNE_PROBABILITY) {
      await deleteStaleRateLimits();
    }

    if (count <= max) return { allowed: true, retryAfter: null };

    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000)),
    };
  } catch (error) {
    console.error("Rate limit check failed", error);
    return { allowed: true, retryAfter: null };
  }
}

/** Deletes counters whose window ended more than `STALE_ENTRY_TTL_MS` ago. */
export async function deleteStaleRateLimits() {
  await sql`
    DELETE FROM rate_limit
    WHERE window_start < ${Date.now() - STALE_ENTRY_TTL_MS}
  `;
}

/** Deletes the counters keyed by a user's ID or email address. */
export async function deleteUserRateLimits(userId: string, email: string) {
  const userKeySuffix = `:user:${hashRateLimitKey(userId)}`;
  const emailKeySuffix = `:email:${hashRateLimitKey(email.trim().toLowerCase())}`;

  await sql`
    DELETE FROM rate_limit
    WHERE right(key, ${userKeySuffix.length}) = ${userKeySuffix}
      OR right(key, ${emailKeySuffix.length}) = ${emailKeySuffix}
  `;
}

/**
 * Shared Postgres storage for better-auth's built-in `/api/auth` limiter.
 * better-auth keys entries by the raw client IP (`<ip>|<path>`), so the key is
 * hashed before it is stored.
 */
export const rateLimitStorage: RateLimitStorage = {
  consume: (key, rule) =>
    consumeRateLimit(`better-auth:${hashRateLimitKey(key)}`, rule),
};
