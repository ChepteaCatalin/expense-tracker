import { unstable_rethrow } from "next/navigation";

export function userTag(userId: string) {
  return (tag: string): string => `user/${userId}/${tag}`;
}

export function withFallback<Args extends unknown[], Result, Fallback>(
  fallback: Fallback,
  fn: (...args: Args) => Promise<Result>,
) {
  return async (...args: Args): Promise<Result | Fallback> => {
    try {
      return await fn(...args);
    } catch (error) {
      unstable_rethrow(error);
      return fallback;
    }
  };
}
