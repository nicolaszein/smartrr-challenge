import { Knex } from 'knex'
import { Conversion } from '../domain/conversion'
import IConversionRepository from '../domain/conversionRepository'

class ConversionRepository implements IConversionRepository {
  private db: Knex

  constructor(db: Knex) {
    this.db = db
  }

  async fetchAll(limit?: number): Promise<Conversion[]> {
    return this.db<Conversion>('conversion')
      .select('id', 'from', 'to', 'rate')
      .orderBy('id', 'desc')
      .limit(limit || 24)
  }

  async create(conversion: Conversion): Promise<Conversion> {
    const conversionCreated = this.db<Conversion>('conversion')
      .insert(conversion)
      .returning(['id', 'from', 'to', 'rate'])
      .then(([conversionCreated]) => conversionCreated)

    return conversionCreated
  }
}

export default ConversionRepository
