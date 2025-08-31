import { z } from 'zod';

export const AuthorCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().optional()
});

export const AuthorUpdateSchema = AuthorCreateSchema.partial();

export const AuthorParamsSchema = z.object({ id: z.coerce.number().int().positive() });
