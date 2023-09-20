export default {
  JOB_REPEAT_PATTERN: process.env.JOB_REPEAT_PATTERN as string,
  JOB_RETRY_ATTEMPTS: parseInt(process.env.JOB_RETRY_ATTEMPTS as string),
  JOB_RETRY_DELAY: parseInt(process.env.JOB_RETRY_DELAY as string),

  DB_PORT: parseInt(process.env.DB_PORT as string),
  DB_HOST: process.env.DB_HOST as string,
  DB_USERNAME: process.env.DB_USERNAME as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME as string,

  REDIS_PORT: parseInt(process.env.REDIS_PORT as string),
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_USERNAME: process.env.REDIS_USERNAME as string,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
  REDIS_CONNECT_TIMEOUT: parseInt(process.env.REDIS_CONNECT_TIMEOUT as string),
  REDIS_COMMAND_TIMEOUT: parseInt(process.env.REDIS_COMMAND_TIMEOUT as string),

  CURRENCY_API_HOST: process.env.CURRENCY_API_HOST as string,
  CURRENCY_API_KEY: process.env.CURRENCY_API_KEY as string,
}
