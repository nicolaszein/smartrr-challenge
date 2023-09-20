import { ConversionRequest } from '../domain/conversionRequest'
import axios from 'axios'
import settings from './settings'

class ClientError extends Error {}

export const getConversionRate = async (
  request: ConversionRequest
): Promise<number> => {
  try {
    const response = await axios.get(
      `${settings.CURRENCY_API_HOST}/currency/convert`,
      {
        params: {
          format: 'json',
          from: request.from,
          to: request.to,
          amount: '1',
        },
        headers: {
          'X-RapidAPI-Key': settings.CURRENCY_API_KEY,
          'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
        },
      }
    )

    return parseFloat(response.data.rates[request.to].rate)
  } catch (error) {
    throw new ClientError('Error when trying to get conversion rate')
  }
}
