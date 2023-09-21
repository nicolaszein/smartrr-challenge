import nock from 'nock'
import ConversionRepository from '../../../infrastructure/conversionRepository'
import { createConnection } from '../../../infrastructure/database'
import { setupDatabase } from '../../../setupTest'
import ConversionJob from '../conversionJob'
import settings from '../../../infrastructure/settings'
import ConversionService from '../../../application/conversionService'

describe('createConversion Job', () => {
  const testDb = createConnection()
  const repository = new ConversionRepository(testDb)
  const service = new ConversionService(repository)
  const job = new ConversionJob(service)

  setupDatabase(testDb)

  describe('createConversion', () => {
    it('persists conversion', async () => {
      const request = {
        from: 'USD',
        to: 'BRL',
      }
      nock(settings.CURRENCY_API_HOST, {
        reqheaders: {
          'X-RapidAPI-Key': settings.CURRENCY_API_KEY,
          'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
        },
      })
        .get('/currency/convert')
        .query({
          format: 'json',
          from: 'USD',
          to: 'BRL',
          amount: '1',
        })
        .reply(200, {
          base_currency_code: 'USD',
          base_currency_name: 'United States dollar',
          amount: '1',
          updated_date: '2023-09-20',
          rates: {
            BRL: {
              currency_name: 'Brazilian real',
              rate: '4.8760',
              rate_for_amount: '4.8760',
            },
          },
          status: 'success',
        })

      await job.createConversion(request)

      const conversions = await repository.fetchAll()
      expect(conversions).toHaveLength(1)
    })
  })
})
