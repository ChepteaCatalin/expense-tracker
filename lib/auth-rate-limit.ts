import "server-only";

import type { GenericEndpointContext } from "better-auth";
import { APIError, getIp, getSessionFromCtx } from "better-auth/api";
import {
  consumeRateLimit,
  hashRateLimitKey,
  type RateLimitRule,
} from "@/lib/rate-limit";

interface AuthRateLimitRules {
  ip?: RateLimitRule;
  email?: RateLimitRule;
  user?: RateLimitRule;
}

// Applied in a before-hook so they cover both direct `auth.api.*` calls from
// server actions (which bypass better-auth's HTTP rate limiter) and requests
// to `/api/auth/*`.
const authRateLimitRules: Record<string, AuthRateLimitRules> = {
  "/sign-in/email": {
    ip: { window: 60, max: 10 },
    email: { window: 15 * 60, max: 10 },
  },
  "/sign-up/email": {
    ip: { window: 10 * 60, max: 5 },
  },
  "/change-password": {
    ip: { window: 60, max: 10 },
    user: { window: 15 * 60, max: 5 },
  },
};

export async function enforceAuthRateLimits(ctx: GenericEndpointContext) {
  const path = ctx.path;
  const rules = path ? authRateLimitRules[path] : undefined;
  if (!rules) return;

  const checks: Array<[key: string, rule: RateLimitRule]> = [];

  const source = ctx.request ?? ctx.headers;
  const ip = source ? getIp(source, ctx.context.options) : null;
  if (rules.ip && ip) {
    checks.push([`auth:${path}:ip:${hashRateLimitKey(ip)}`, rules.ip]);
  }

  const email = ctx.body?.email;
  if (rules.email && typeof email === "string" && email.trim()) {
    const normalizedEmail = email.trim().toLowerCase();
    checks.push([
      `auth:${path}:email:${hashRateLimitKey(normalizedEmail)}`,
      rules.email,
    ]);
  }

  if (rules.user) {
    const session = await getSessionFromCtx(ctx);
    if (session) {
      checks.push([`auth:${path}:user:${session.user.id}`, rules.user]);
    }
  }

  for (const [key, rule] of checks) {
    const { allowed, retryAfter } = await consumeRateLimit(key, rule);
    if (!allowed) throw tooManyRequests(retryAfter ?? rule.window);
  }
}

function tooManyRequests(retryAfter: number) {
  const minutes = Math.ceil(retryAfter / 60);
  const wait =
    retryAfter < 60
      ? `${retryAfter} second${retryAfter === 1 ? "" : "s"}`
      : `${minutes} minute${minutes === 1 ? "" : "s"}`;

  return new APIError(
    "TOO_MANY_REQUESTS",
    {
      code: "TOO_MANY_REQUESTS",
      message: `Too many attempts. Please try again in ${wait}.`,
    },
    { "X-Retry-After": String(retryAfter) },
  );
}
