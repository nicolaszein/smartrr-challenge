import ConversionService from '../../application/conversionService'
import { ConversionRequest } from '../../domain/conversionRequest'
import { getConversionRate } from '../../infrastructure/conversionClient'

class ConversionJob {
  private service: ConversionService

  constructor(service: ConversionService) {
    this.service = service
  }

  async createConversion(request: ConversionRequest): Promise<void> {
    try {
      const rate = await getConversionRate(request)

      await this.service.create({
        from: request.from,
        to: request.to,
        rate: rate,
      })
    } catch (error) {
      console.error(`Error when trying to create conversion: ${error}`)
    }
  }
}

export default ConversionJob
