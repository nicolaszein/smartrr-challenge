import path from 'path'
import { Knex } from 'knex'
import { connectionConfig } from './src/infrastructure/database'

const knexConfig: Knex.Config = {
  ...connectionConfig,
  migrations: {
    directory: path.join(__dirname, 'migrations'),
  },
}

export default knexConfig
