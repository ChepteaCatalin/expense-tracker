export function toCents(amount: number | '') {
  return (+amount || 0) * 100;
}
