export const periods = ['day', 'week', 'month', 'year', 'custom'] as const;

export function isValidPeriodParam(
  param: string | null,
): param is (typeof periods)[number] {
  return (periods as readonly string[]).includes(param ?? '');
}
