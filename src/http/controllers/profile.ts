import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const makeGetUserProfile = makeGetUserProfileUseCase()

  const { user } = await makeGetUserProfile.execute({
    userId,
  })

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
