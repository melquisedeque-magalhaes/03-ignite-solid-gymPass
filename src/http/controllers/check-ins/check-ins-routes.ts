import { verifyJWT } from '@/http/middleware/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-in', create)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.patch('/check-ins/:checkInId/validate', validate)
}
