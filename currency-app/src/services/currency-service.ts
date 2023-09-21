import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

export const getConversions = async () => {
  const response = await axios.get(`http://localhost:8000/conversions`)
  return response.data
}
