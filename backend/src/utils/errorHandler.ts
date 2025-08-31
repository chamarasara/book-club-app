import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(error: FastifyError, _req: FastifyRequest, reply: FastifyReply) {
  if ((error as any).validation) {
    return reply.code(400).send({ message: 'Validation error', details: (error as any).validation });
  }
  const status = (error as any).statusCode ?? 500;
  reply.code(status).send({ message: error.message || 'Internal Server Error' });
}
