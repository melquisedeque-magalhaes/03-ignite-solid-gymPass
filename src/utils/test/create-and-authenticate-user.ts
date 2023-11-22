import { FastifyInstance } from 'fastify'

import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Melqui',
    email: 'melqui.sodre3@gmail.com',
    password: '123456',
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
