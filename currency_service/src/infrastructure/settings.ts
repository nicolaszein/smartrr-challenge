export default {
  JOB_REPEAT_PATTERN: process.env.JOB_REPEAT_PATTERN as string,
  JOB_RETRY_ATTEMPTS: parseInt(process.env.JOB_RETRY_ATTEMPTS as string),
  JOB_RETRY_DELAY: parseInt(process.env.JOB_RETRY_DELAY as string),

  REDIS_PORT: parseInt(process.env.REDIS_PORT as string),
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_USERNAME: process.env.REDIS_USERNAME as string,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
  REDIS_CONNECT_TIMEOUT: parseInt(process.env.REDIS_CONNECT_TIMEOUT as string),
  REDIS_COMMAND_TIMEOUT: parseInt(process.env.REDIS_COMMAND_TIMEOUT as string),
}
