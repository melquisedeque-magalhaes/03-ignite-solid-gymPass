import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserCheckInsMetricsUseCase } from '@/use-cases/factories/make-get-user-check-ins-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserCheckInsMetrics = makeGetUserCheckInsMetricsUseCase()

  const { countCheckIns } = await getUserCheckInsMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    countCheckIns,
  })
}
