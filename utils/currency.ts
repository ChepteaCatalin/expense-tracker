export function toCents(amount: number | '') {
  return +amount * 100;
}

export function fromCents(amount: number) {
  return amount / 100;
}
