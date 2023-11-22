import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'

import { env } from './env'
import { userRoutes } from './http/controllers/users/user-routes'
import { gymsRoutes } from './http/controllers/gyms/gyms-routes'
import { checkInsRoutes } from './http/controllers/check-ins/check-ins-routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here should log to an extenal tool like DataDog/NewRelic/Sentry
  }

  reply.status(500).send({ message: 'Internal server error' })
})
