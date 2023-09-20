import { Conversion } from '../domain/conversion'
import IConversionRepository from '../domain/conversionRepository'

class ConversionService {
  private repository: IConversionRepository

  constructor(repository: IConversionRepository) {
    this.repository = repository
  }

  async fetchAll(limit?: number): Promise<Conversion[]> {
    return await this.repository.fetchAll(limit)
  }

  async create(conversion: Conversion): Promise<Conversion> {
    return await this.repository.create(conversion)
  }
}

export default ConversionService
