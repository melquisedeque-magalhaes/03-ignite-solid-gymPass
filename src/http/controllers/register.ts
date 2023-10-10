import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlrealdyExists } from '@/use-cases/errors/user-alrealdy-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registrationSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registrationSchemaBody.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(userRepository)

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
