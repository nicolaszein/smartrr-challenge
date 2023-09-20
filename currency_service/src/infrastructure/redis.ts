import IORedis from 'ioredis'
import settings from './settings'

const connection = new IORedis({
  port: settings.REDIS_PORT,
  host: settings.REDIS_HOST,
  username: settings.REDIS_USERNAME,
  password: settings.REDIS_PASSWORD,
  connectTimeout: settings.REDIS_CONNECT_TIMEOUT,
  maxRetriesPerRequest: null,
})

export default connection
