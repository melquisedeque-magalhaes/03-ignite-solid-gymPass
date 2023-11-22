import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInSchemaParams = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInSchemaParams.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(200).send({
    checkIn,
  })
}
