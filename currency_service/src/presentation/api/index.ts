import fastify, { FastifyInstance } from 'fastify'
import { conversionRouter } from './conversion'

const app: FastifyInstance = fastify()
app.register(conversionRouter)

// server.listen({ port: 8000 }, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })

export default app
