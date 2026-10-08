import "server-only";

import { Pool } from "@neondatabase/serverless";
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { enforceAuthRateLimits } from "@/lib/auth-rate-limit";
import { rateLimitStorage } from "@/lib/rate-limit";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  plugins: [nextCookies()],
  rateLimit: {
    customStorage: rateLimitStorage,
  },
  hooks: {
    before: createAuthMiddleware(enforceAuthRateLimits),
  },
  user: {
    additionalFields: {
      currency: {
        type: "string",
        defaultValue: "MDL",
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
