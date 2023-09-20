import { Knex } from 'knex'

export const setupDatabase = (db: Knex) => {
  beforeAll(async () => {
    await db.migrate.latest()
  })

  beforeEach(async () => {
    await db.raw('TRUNCATE TABLE conversion RESTART IDENTITY CASCADE')
  })

  afterAll(async () => {
    await db.destroy()
  })
}
