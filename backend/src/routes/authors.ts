import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../plugins/prisma.js';
import { AuthorCreateSchema, AuthorUpdateSchema, AuthorParamsSchema } from '../schemas/authorSchemas.js';

const authorsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return prisma.author.findMany({ include: { books: true } });
  });

  app.get('/:id', { schema: { params: AuthorParamsSchema } }, async (req, reply) => {
    const id = Number((req.params as any).id);
    const author = await prisma.author.findUnique({ where: { id }, include: { books: true } });
    if (!author) return reply.code(404).send({ message: 'Author not found' });
    return author;
  });

  app.post('/', { schema: { body: AuthorCreateSchema } }, async (req, reply) => {
    const data = req.body as any;
    const created = await prisma.author.create({ data });
    return reply.code(201).send(created);
  });

  app.put('/:id', { schema: { params: AuthorParamsSchema, body: AuthorUpdateSchema } }, async (req, reply) => {
    const id = Number((req.params as any).id);
    try {
      const updated = await prisma.author.update({ where: { id }, data: req.body as any });
      return updated;
    } catch {
      return reply.code(404).send({ message: 'Author not found' });
    }
  });

  app.delete('/:id', { schema: { params: AuthorParamsSchema } }, async (req, reply) => {
    const id = Number((req.params as any).id);
    try {
      await prisma.author.delete({ where: { id } });
      return reply.code(204).send();
    } catch {
      return reply.code(404).send({ message: 'Author not found' });
    }
  });
};

export default authorsRoutes;
