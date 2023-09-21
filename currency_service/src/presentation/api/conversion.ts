import { FastifyRequest, FastifyInstance, FastifyPluginOptions } from 'fastify'
import { getContainerDependencies } from '../dependencyContainer'
import { Conversion } from '../../domain/conversion'

type ListConversionsRequest = FastifyRequest<{
  Querystring: {
    limit?: number
  }
}>

export const conversionRouter = (
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) => {
  server.get(
    '/conversions',
    async (request: ListConversionsRequest): Promise<Conversion[]> => {
      const { limit } = request.query
      const dependencies = getContainerDependencies()

      return dependencies.conversionService.fetchAll(limit)
    }
  )

  done()
}
