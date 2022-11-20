import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

export const ValidateObject = (schema: new () => any) =>
  applyDecorators(
    IsObject(),
    ValidateNested({ each: true, always: true }),
    Type(() => schema)
  );
