import ConversionService from '../../application/conversionService'
import { ConversionRequest } from '../../domain/conversionRequest'
import { getConversionRate } from '../../infrastructure/conversionClient'

class ConversionJob {
  private service: ConversionService

  constructor(service: ConversionService) {
    this.service = service
  }

  async createConversion(request: ConversionRequest): Promise<void> {
    const rate = await getConversionRate(request)

    await this.service.create({
      from: request.from,
      to: request.to,
      rate: rate,
    })
  }
}

export default ConversionJob
