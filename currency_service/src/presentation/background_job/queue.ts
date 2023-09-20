import { Queue } from 'bullmq'
import redisConnection from '../../infrastructure/redis'

export const currencyConversionQueue = new Queue('Currency Conversion Queue', {
  connection: redisConnection,
})
