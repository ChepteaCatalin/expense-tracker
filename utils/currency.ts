export function toCents(amount: number | '') {
  return Math.round(+amount * 100);
}

export function fromCents(amount: number) {
  return parseFloat((amount / 100).toFixed(2));
}

export function readableCurrency(value: number) {
  return new Intl.NumberFormat('en-US').format(value).replace(/,/g, ' ');
}
