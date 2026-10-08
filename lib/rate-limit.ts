import "server-only";

import { createHash } from "node:crypto";
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

const STALE_ENTRY_TTL_MS = 24 * 60 * 60 * 1000;
const PRUNE_PROBABILITY = 0.01;

export function hashRateLimitKey(value: string): string {
  return createHash("sha256").update(value).digest("hex");
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
    const [row] = await sql`
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
      await sql`
        DELETE FROM rate_limit
        WHERE window_start < ${now - STALE_ENTRY_TTL_MS}
      `;
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

/** Shared Postgres storage for better-auth's built-in `/api/auth` limiter. */
export const rateLimitStorage: RateLimitStorage = {
  async get(key) {
    try {
      const [row] = await sql`
        SELECT key, count, window_start
        FROM rate_limit
        WHERE key = ${key}
      `;
      if (!row) return null;

      return {
        key: row.key,
        count: Number(row.count),
        lastRequest: Number(row.window_start),
      };
    } catch (error) {
      console.error("Rate limit read failed", error);
      return null;
    }
  },
  async set(key, value) {
    try {
      await sql`
        INSERT INTO rate_limit (key, count, window_start)
        VALUES (${key}, ${value.count}, ${value.lastRequest})
        ON CONFLICT (key) DO UPDATE SET
          count = EXCLUDED.count,
          window_start = EXCLUDED.window_start
      `;
    } catch (error) {
      console.error("Rate limit write failed", error);
    }
  },
  consume: consumeRateLimit,
};
