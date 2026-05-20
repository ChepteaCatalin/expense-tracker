import 'server-only';

import { getSession } from '@/data/auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { UnauthorizedError } from '@/utils/error';
import { type Session } from './auth';

export const requireAuth = cache(async () => {
  const session = await getSession();

  if (!session) redirect('/signin');

  return session;
});

type UserTag = (tag: string) => string;

export function authGuard<Result>(
  fn: (session: Session, userTag: UserTag) => Promise<Result>,
): () => Promise<Result>;
export function authGuard<Args extends unknown[], Result>(
  fn: (
    session: Session,
    userTag: UserTag,
  ) => (...args: Args) => Promise<Result>,
): (...args: Args) => Promise<Result>;
export function authGuard<Args extends unknown[], Result>(
  fn:
    | ((session: Session, userTag: UserTag) => Promise<Result>)
    | ((
        session: Session,
        userTag: UserTag,
      ) => (...args: Args) => Promise<Result>),
) {
  return async (...args: Args): Promise<Result> => {
    const session = await getSession();
    if (!session) throw new UnauthorizedError();

    const userTag: UserTag = tag => `user/${session.user.id}/${tag}`;
    const guarded = fn(session, userTag);

    if (typeof guarded == 'function') return guarded(...args);
    return guarded;
  };
}
