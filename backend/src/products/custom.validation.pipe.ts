import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseQueryPipe<T = never> implements PipeTransform<string, T> {
  transform(value: any) {
    for (const key in value)
      if (typeof value[key] === 'string' && value[key].includes(','))
        value[key] = value[key].split(',');

    return value as T;
  }
}
