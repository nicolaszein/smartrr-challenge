import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { conversionRouter } from './conversion'
import settings from '../../infrastructure/settings'

const app: FastifyInstance = fastify()
app.register(conversionRouter)

app.register(cors, {
  origin: settings.ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

export default app
