import "server-only";

import { Pool } from "@neondatabase/serverless";
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { enforceAuthRateLimits } from "@/lib/auth-rate-limit";
import { deleteUserRateLimits, rateLimitStorage } from "@/lib/rate-limit";

// Google is only used to confirm the user's identity; the app never calls
// Google APIs, so OAuth tokens are not stored (data minimisation).
async function withoutOAuthTokens<Account extends object>(account: Account) {
  return {
    data: {
      ...account,
      accessToken: null,
      refreshToken: null,
      idToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
    },
  };
}

// IP address and user agent are not needed to keep users signed in.
async function withoutClientDetails<Session extends object>(session: Session) {
  return { data: { ...session, ipAddress: null, userAgent: null } };
}

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
      afterDelete: async (user) => {
        try {
          await deleteUserRateLimits(user.id, user.email);
        } catch (error) {
          console.error("Failed to delete rate limit entries", error);
        }
      },
    },
  },
  databaseHooks: {
    account: {
      create: { before: withoutOAuthTokens },
      update: { before: withoutOAuthTokens },
    },
    session: {
      create: { before: withoutClientDetails },
      update: { before: withoutClientDetails },
    },
  },
  telemetry: {
    enabled: false,
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
