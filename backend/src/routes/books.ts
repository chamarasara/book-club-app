import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../plugins/prisma.js';
import { BookCreateSchema, BookParamsSchema, BookUpdateSchema } from '../schemas/bookSchemas.js';

const booksRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return prisma.book.findMany({ include: { author: true } });
  });

  app.get('/:id', async (req, reply) => {
    const id = Number((req.params as any).id);
    const book = await prisma.book.findUnique({ where: { id }, include: { author: true } });
    if (!book) return reply.code(404).send({ message: 'Book not found' });
    return book;
  });

  app.post('/', async (req, reply) => {
    const data = req.body as any;
    const created = await prisma.book.create({ data });
    return reply.code(201).send(created);
  });

  app.put('/:id', async (req, reply) => {
    const id = Number((req.params as any).id);
    try {
      const updated = await prisma.book.update({ where: { id }, data: req.body as any });
      return updated;
    } catch {
      return reply.code(404).send({ message: 'Book not found' });
    }
  });

  app.delete('/:id', async (req, reply) => {
    const id = Number((req.params as any).id);
    try {
      await prisma.book.delete({ where: { id } });
      return reply.code(204).send();
    } catch {
      return reply.code(404).send({ message: 'Book not found' });
    }
  });
};

export default booksRoutes;
