import "server-only";

import { getSession } from "@/data/auth";
import { redirect } from "next/navigation";
import { cache } from "react";
import { UnauthorizedError } from "@/utils/error";
import { type Session } from "./auth";

export const requireAuth = cache(async () => {
  const session = await getSession();

  if (!session) redirect("/signin");

  return session;
});

export function authGuard<Result>(
  fn: (session: Session) => Promise<Result>,
): () => Promise<Result>;
export function authGuard<Args extends unknown[], Result>(
  fn: (session: Session) => (...args: Args) => Promise<Result>,
): (...args: Args) => Promise<Result>;
export function authGuard<Args extends unknown[], Result>(
  fn:
    | ((session: Session) => Promise<Result>)
    | ((session: Session) => (...args: Args) => Promise<Result>),
) {
  return async (...args: Args): Promise<Result> => {
    const session = await getSession();
    if (!session) throw new UnauthorizedError();

    const guarded = fn(session);

    if (typeof guarded == "function") return guarded(...args);
    return guarded;
  };
}
