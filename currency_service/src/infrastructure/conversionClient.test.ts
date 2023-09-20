import nock from 'nock'
import settings from './settings'
import { getConversionRate } from './conversionClient'

describe('ConversionClient', () => {
  describe('getConversionRate', () => {
    it('returns the rate from api', async () => {
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

      const rate = await getConversionRate({
        from: 'USD',
        to: 'BRL',
      })

      expect(rate).toEqual(4.876)
    })

    it('throws error if request fails', async () => {
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
        .reply(400)

      expect(
        async () =>
          await getConversionRate({
            from: 'USD',
            to: 'BRL',
          })
      ).rejects.toThrow()
    })
  })
})
