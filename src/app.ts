import fastify from 'fastify'
import { appRoutes } from './http/routes/appRoutes'

export const app = fastify()

app.register(appRoutes)
