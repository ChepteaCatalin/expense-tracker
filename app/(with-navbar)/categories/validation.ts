import z from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  type: z.enum(['expense', 'income']),
  icon: z.string().trim().min(1, 'Image is required'),
  strokeColor: z.string().trim().min(1, 'Stroke color is required'),
});
