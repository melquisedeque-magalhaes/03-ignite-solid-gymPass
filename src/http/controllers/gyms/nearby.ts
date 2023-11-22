import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeSearchNearByGymsUseCase } from '@/use-cases/factories/make-search-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymSchemaQuery = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymSchemaQuery.parse(request.query)

  const searchNearbyGymUseCase = makeSearchNearByGymsUseCase()

  const { gyms } = await searchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
