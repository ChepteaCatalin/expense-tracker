import z from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  type: z.enum(['expense', 'income']),
  icon: z
    .string()
    .trim()
    .min(1, 'Icon is required')
    .max(255, 'Icon must be at most 255 characters'),
  strokeColor: z
    .string()
    .trim()
    .min(1, 'Stroke color is required')
    .max(100, 'Stroke color must be at most 100 characters'),
  backgroundColor: z
    .string()
    .trim()
    .min(1, 'Background color is required')
    .max(100, 'Background color must be at most 100 characters'),
});
