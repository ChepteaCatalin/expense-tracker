export function normalizeAmountNumberInput(value: string): number | "" {
  const normalized = String(value).trim().replace(",", ".");

  if (!normalized) return "";

  return +normalized;
}
