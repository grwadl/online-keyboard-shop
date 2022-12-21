import { Injectable } from '@nestjs/common'
import { FindManyOptions, In, Like } from 'typeorm'

const isArray = (data: Array<any> | unknown): data is Array<any> =>
  Array.isArray(data)

const isLikeStatement = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith('~')

const generateQuery = (value: Array<any> | unknown) => {
  if (isArray(value)) return In<unknown[]>(value)
  if (isLikeStatement(value)) return Like(`%${value.slice(1)}%`)
  return value
}

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
        [key]: generateQuery(value)
      }
    }
    console.log(res)

    return res as T
  }
}
