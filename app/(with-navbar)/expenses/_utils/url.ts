export const customPeriod = 'custom';

export const periods = ['day', 'week', 'month', 'year', customPeriod] as const;

export function isValidPeriodParam(
  param: string | null,
): param is (typeof periods)[number] {
  return (periods as readonly string[]).includes(param ?? '');
}

export function isValidDiffParam(param: string | null): param is string | null {
  if (param == null) return true;
  return !Number.isNaN(parseInt(param, 10));
}
