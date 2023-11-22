import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { UserAlrealdyExists } from '@/use-cases/errors/user-alrealdy-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registrationSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registrationSchemaBody.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      name,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlrealdyExists) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
