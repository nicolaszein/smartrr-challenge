import { Conversion } from './conversion'

export default interface IConversionRepository {
  fetchAll(limit?: number): Promise<Conversion[]>

  create(conversion: Conversion): Promise<Conversion>
}
