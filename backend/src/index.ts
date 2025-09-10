import Fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import * as dotenv from 'dotenv';
import authorsRoutes from './routes/authors.js';
import booksRoutes from './routes/books.js';
import { errorHandler } from './utils/errorHandler.js';

dotenv.config();

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

await app.register(cors, { origin: true });
await app.register(formBody);

app.get('/health', async () => ({ status: 'ok' }));

await app.register(authorsRoutes, { prefix: '/authors' });
await app.register(booksRoutes, { prefix: '/books' });

app.setErrorHandler(errorHandler);

const port = Number(process.env.PORT || 4000);
try {
  await app.listen({ port, host: '0.0.0.0' });
  app.log.info(`Server listening on ${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
