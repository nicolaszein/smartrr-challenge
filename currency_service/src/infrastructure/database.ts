import Knex from 'knex'
import pg from 'pg'
import settings from './settings'

pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number)

export const connectionConfig = {
  client: 'postgresql',
  connection: {
    host: settings.DB_HOST,
    port: settings.DB_PORT,
    user: settings.DB_USERNAME,
    password: settings.DB_PASSWORD,
    database: settings.DB_DATABASE_NAME,
  },
}

export const createConnection = () => {
  return Knex({
    ...connectionConfig,
  })
}
