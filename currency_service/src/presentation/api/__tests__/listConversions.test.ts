import app from '..'
import { FastifyInstance } from 'fastify'
import supertest from 'supertest'
import { createConnection } from '../../../infrastructure/database'
import { setupDatabase } from '../../../setupTest'
import ConversionRepository from '../../../infrastructure/conversionRepository'

describe('List Conversions', () => {
  const server: FastifyInstance = app
  const request = supertest(server.server)
  const testDb = createConnection()
  const repository = new ConversionRepository(testDb)

  setupDatabase(testDb)

  beforeAll(async () => {
    await server.ready()
  })

  afterAll(() => {
    server.close()
  })

  it('returns empty list if no conversions', async () => {
    const response = await request.get('/conversions')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it('returns list of conversions', async () => {
    const conversion1 = {
      from: 'USD',
      to: 'BRL',
      rate: 4.9999,
    }
    const conversion2 = {
      from: 'USD',
      to: 'BRL',
      rate: 4.8888,
    }
    await repository.create(conversion1)
    await repository.create(conversion2)

    const response = await request.get('/conversions')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body).toEqual([
      {
        id: 2,
        from: 'USD',
        to: 'BRL',
        rate: 4.8888,
      },
      {
        id: 1,
        from: 'USD',
        to: 'BRL',
        rate: 4.9999,
      },
    ])
  })

  it('returns list of conversions with limit', async () => {
    const conversion1 = {
      from: 'USD',
      to: 'BRL',
      rate: 4.9999,
    }
    const conversion2 = {
      from: 'USD',
      to: 'BRL',
      rate: 4.8888,
    }
    await repository.create(conversion1)
    await repository.create(conversion2)

    const response = await request.get('/conversions?limit=1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual([
      {
        id: 2,
        from: 'USD',
        to: 'BRL',
        rate: 4.8888,
      },
    ])
  })
})
