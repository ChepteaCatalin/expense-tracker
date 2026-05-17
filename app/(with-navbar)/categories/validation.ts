import z from 'zod';
import { categoryIcons } from '@/utils/category-icons';

type ValidIconSrc = (typeof categoryIcons)[number]['src'];
const VALID_ICONS = categoryIcons.map(({ src }) => src) as [
  ValidIconSrc,
  ...ValidIconSrc[],
];

const colorSchema = z
  .string()
  .trim()
  .regex(
    /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0?\.\d+|0|1(\.0+)?))?\s*\)$/,
    'Must be a valid color',
  )
  .refine(value => {
    const match = value.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
    if (!match) return false;
    return (
      Number(match[1]) <= 255 &&
      Number(match[2]) <= 255 &&
      Number(match[3]) <= 255
    );
  }, 'Must be a valid color');

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  type: z.enum(['expense', 'income']),
  icon: z
    .string()
    .refine(
      val => (VALID_ICONS as string[]).includes(val),
      'Must be a valid icon',
    ),
  strokeColor: colorSchema,
  backgroundColor: colorSchema,
});
