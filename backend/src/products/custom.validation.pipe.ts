import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseQueryPipe<T = never> implements PipeTransform<string, T> {
  transform(query: any) {
    for (const [key, value] of Object.entries(query)) {
      if (typeof value !== 'string') return

      if (value.includes('lt') && value.includes('gt')) {
        const queryArray = value.split(',')
        if (!queryArray[0] && !queryArray[1]) return
        let [greaterThan, lowerThan] =
          queryArray[0].includes('gt') && queryArray[1].includes('lt')
            ? queryArray
            : queryArray.reverse()

        greaterThan = greaterThan.replace('gt', '')
        lowerThan = lowerThan.replace('lt', '')
        query[key] = { greaterThan: +greaterThan, lowerThan: +lowerThan }
      } else if (value.includes(',')) query[key] = value.split(',')
    }

    return query as T
  }
}
