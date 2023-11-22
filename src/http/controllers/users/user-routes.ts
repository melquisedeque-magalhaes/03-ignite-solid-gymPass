import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

import { verifyJWT } from '../../middleware/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: verifyJWT }, profile)
}
