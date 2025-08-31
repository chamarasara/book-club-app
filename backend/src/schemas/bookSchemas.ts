import { z } from 'zod';

export const BookCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authorId: z.coerce.number().int().positive(),
  description: z.string().optional(),
  publishedYear: z.coerce.number().int().min(0).max(new Date().getFullYear()).optional()
});

export const BookUpdateSchema = BookCreateSchema.partial();

export const BookParamsSchema = z.object({ id: z.coerce.number().int().positive() });
