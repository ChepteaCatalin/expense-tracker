export function validIdParam(id: unknown): boolean {
  if (typeof id != 'string') return false;
  const s = id.trim();
  if (!/^[0-9]+$/.test(s)) return false;
  return Number.isSafeInteger(+s);
}
