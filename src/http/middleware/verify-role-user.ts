import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRoleUser(role: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== role) {
      return reply.status(401).send({
        message: 'Unauthorized.',
      })
    }
  }
}
