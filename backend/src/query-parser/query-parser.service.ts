import { Injectable } from '@nestjs/common'
import { FindManyOptions, In, Like } from 'typeorm'

export const isArray = (data: Array<any> | unknown): data is Array<any> =>
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

const handlePagination = (page: number, limit: number) => {
  if (!page || !limit) return

  const skip = (page - 1) * limit
  return { skip, take: limit }
}

@Injectable()
export class QueryParserService {
  transformQuery<T, U extends Record<string, any>>(
    parsedQuery: U
  ): FindManyOptions<T> | undefined {
    if (!parsedQuery) return
    const { sort, page, limit, ...filters } = parsedQuery
    const res = {
      where: {},
      order: handleSorting(sort),
      ...handlePagination(+page, +limit)
    }

    for (const [key, value] of Object.entries(filters))
      res.where = {
        ...res.where,
        [key]: generateQuery(value)
      }

    return res as T
  }
}
