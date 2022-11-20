import { Injectable } from '@nestjs/common';
import { FindManyOptions, In } from 'typeorm';

const isArray = (data: Array<any> | unknown): data is Array<any> =>
  Array.isArray(data);

@Injectable()
export class QueryParserService {
  transformQuery<T, U extends Record<any, unknown>>(
    parsedQuery: U
  ): FindManyOptions<T> | undefined {
    const res = { where: {} };
    if (!parsedQuery) return;
    for (const [key, value] of Object.entries(parsedQuery)) {
      res.where = isArray(value)
        ? {
            ...res.where,
            [key]: In<unknown[]>(value)
          }
        : {
            ...res.where,
            [key]: value
          };
    }
    return res;
  }
}
