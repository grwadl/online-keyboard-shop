import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class ParseQueryPipe<T = never> implements PipeTransform<string, T> {
  transform(query: any) {
    for (const [key, value] of Object.entries(query))
      if (typeof value === 'string' && value.includes(','))
        query[key] = value.split(',')

    return query as T
  }
}
