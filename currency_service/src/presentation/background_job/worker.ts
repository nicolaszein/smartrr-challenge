import { Worker, Job } from 'bullmq'
import { currencyConversionQueue } from './queue'
import redisConnection from '../../infrastructure/redis'
import settings from '../../infrastructure/settings'
import ConversionJob from './conversionJob'
import { ConversionRequest } from '../../domain/conversionRequest'
import { getContainerDependencies } from '../dependencyContainer'

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

const worker = new Worker<ConversionRequest, void>(
  currencyConversionQueue.name,
  async (job: Job<ConversionRequest>) => {
    const dependencies = getContainerDependencies()
    const conversionJob = new ConversionJob(dependencies.conversionService)

    await conversionJob.createConversion(job.data)
  },
  { autorun: false, connection: redisConnection }
)

worker.run()
