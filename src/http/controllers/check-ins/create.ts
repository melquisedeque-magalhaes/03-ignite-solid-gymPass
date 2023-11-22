import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInSchemaBody = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const checkInIdSchemaParams = z.object({
    gymId: z.string().uuid(),
  })

  const { latitude, longitude } = createCheckInSchemaBody.parse(request.body)
  const { gymId } = checkInIdSchemaParams.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()

  const { checkIn } = await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({
    checkIn,
  })
}
