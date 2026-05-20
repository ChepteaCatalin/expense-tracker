export function userTag(userId: string) {
  return (tag: string): string => `user/${userId}/${tag}`;
}
