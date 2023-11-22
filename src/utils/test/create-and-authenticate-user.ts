import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'

import request from 'supertest'

interface CreateAndAuthenticateUserProps {
  app: FastifyInstance
  isAdmin?: boolean
}

export async function createAndAuthenticateUser({
  app,
  isAdmin = false,
}: CreateAndAuthenticateUserProps) {
  await prisma.user.create({
    data: {
      name: 'Melqui',
      email: 'melqui.sodre3@gmail.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authenticateResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'melqui.sodre3@gmail.com',
      password: '123456',
    })

  const { token } = authenticateResponse.body

  return {
    token,
  }
}
