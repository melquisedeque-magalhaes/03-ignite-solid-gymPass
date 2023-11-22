import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInSchemaQuery = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInSchemaQuery.parse(request.query)

  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
