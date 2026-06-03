import dayjs from 'dayjs';

export function validIdParam(id: string): boolean {
  const s = id.trim();
  if (!/^[0-9]+$/.test(s)) return false;
  return Number.isSafeInteger(+s);
}

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export function parseURLDate(date: string | null | undefined) {
  if (typeof date !== 'string' || !isoDateRegex.test(date)) return dayjs('');

  const parsedDate = dayjs(date);
  if (!parsedDate.isValid() || parsedDate.format('YYYY-MM-DD') !== date) {
    return dayjs('');
  }

  return parsedDate;
}
