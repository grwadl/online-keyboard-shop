import { Injectable } from '@nestjs/common'
import { FindManyOptions, In } from 'typeorm'

const isArray = (data: Array<any> | unknown): data is Array<any> =>
  Array.isArray(data)

@Injectable()
export class QueryParserService {
  transformQuery<T, U extends Record<string, any>>(
    parsedQuery: U
  ): FindManyOptions<T> | undefined {
    const res = { where: {} }
    if (!parsedQuery) return
    for (const [key, value] of Object.entries(parsedQuery)) {
      res.where = {
        ...res.where,
        [key]: isArray(value) ? In<unknown[]>(value) : value
      }
    }
    return res as T
  }
}
