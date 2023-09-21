import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

export default interface Conversion {
  id: number
  from: string
  to: string
  rate: number
  created_at: string
}

export const getConversions = async () => {
  const response = await axios.get(`${process.env.REACT_APP_CURRENCY_SVC_URL}/conversions`)
  const conversions = response.data.map((conversion: Conversion) => ({
    ...conversion,
    created_at: new Date(conversion.created_at),
  }))
  return conversions
}
