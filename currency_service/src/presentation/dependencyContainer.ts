import ConversionService from '../application/conversionService'
import IConversionRepository from '../domain/conversionRepository'
import ConversionRepository from '../infrastructure/conversionRepository'
import { createConnection } from '../infrastructure/database'

interface ContainerDependencies {
  conversionRepository: IConversionRepository
  conversionService: ConversionService
}

export const getContainerDependencies = (): ContainerDependencies => {
  const repository = new ConversionRepository(createConnection())
  const conversionService = new ConversionService(repository)

  return { conversionRepository: repository, conversionService }
}
