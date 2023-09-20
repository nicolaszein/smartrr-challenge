import ConversionRepository from './conversionRepository'
import { Conversion } from '../domain/conversion'
import { createConnection } from '../infrastructure/database'
import { setupDatabase } from '../setupTest'

describe('ConversionRepository', () => {
  const testDb = createConnection()
  const repository = new ConversionRepository(testDb)

  setupDatabase(testDb)

  describe('create', () => {
    it('returns the created conversion', async () => {
      const conversion: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.9999,
      }

      const createdConversion = await repository.create(conversion)

      expect(createdConversion.id).toBeTruthy()
    })
  })

  describe('fetchAll', () => {
    it('returns the persisted conversions', async () => {
      const conversion1: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.9999,
      }
      const conversion2: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.8888,
      }
      await repository.create(conversion1)
      await repository.create(conversion2)

      const conversions = await repository.fetchAll()

      expect(conversions).toBeInstanceOf(Array)
      expect(conversions).toHaveLength(2)
    })

    it('returns the persisted conversions with limit', async () => {
      const conversion1: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.9999,
      }
      const conversion2: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.8888,
      }
      await repository.create(conversion1)
      await repository.create(conversion2)

      const conversions = await repository.fetchAll(1)

      expect(conversions).toBeInstanceOf(Array)
      expect(conversions).toHaveLength(1)
    })

    it('returns the persisted conversions with limit and order', async () => {
      const conversion1: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.9999,
      }
      const conversion2: Conversion = {
        from: 'USD',
        to: 'BRL',
        rate: 4.8888,
      }
      await repository.create(conversion1)
      await repository.create(conversion2)

      const conversions = await repository.fetchAll(1)

      expect(conversions).toBeInstanceOf(Array)
      expect(conversions).toHaveLength(1)
      expect(conversions[0].rate).toEqual(4.8888)
    })
  })
})
