import { Worker, Job } from 'bullmq'
import { currencyConversionQueue } from './queue'
import redisConnection from '../../infrastructure/redis'
import settings from '../../infrastructure/settings'

currencyConversionQueue.add(
  'USD to BRL',
  {
    from: 'USD',
    to: 'BRL',
  },
  {
    attempts: settings.JOB_RETRY_ATTEMPTS,
    repeat: {
      pattern: settings.JOB_REPEAT_PATTERN,
    },
    backoff: {
      type: 'exponential',
      delay: settings.JOB_RETRY_DELAY,
    },
  }
)

const worker = new Worker(
  currencyConversionQueue.name,
  async (job: Job) => {
    console.log(job.data)
  },
  { autorun: false, connection: redisConnection }
)

worker.run()
