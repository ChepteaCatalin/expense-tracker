export function validIdParam(id: string): boolean {
  const s = id.trim();
  if (!/^[0-9]+$/.test(s)) return false;
  return Number.isSafeInteger(+s);
}
