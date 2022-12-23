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

const handleSorting = (sort: string) => {
  const isAvaliable = !!sort || typeof sort === 'string'

  if (!isAvaliable) return
  const sortType = sort.charAt(0) === '-' ? 'DESC' : 'ASC'
  const fieldToSort = sort.slice(1)

  return { [fieldToSort]: sortType }
}

@Injectable()
export class QueryParserService {
  transformQuery<T, U extends Record<string, any>>(
    parsedQuery: U
  ): FindManyOptions<T> | undefined {
    if (!parsedQuery) return
    const { sort, pagination, ...filters } = parsedQuery
    const res = { where: {}, order: handleSorting(sort) }

    for (const [key, value] of Object.entries(filters))
      res.where = {
        ...res.where,
        [key]: generateQuery(value)
      }

    return res as T
  }
}
