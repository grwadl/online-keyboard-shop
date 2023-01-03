import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateCartDtoProduct } from './create-cart.dto'

export class UpdateCartDto extends PartialType(CreateCartDtoProduct) {
  @IsPositive()
  quantity?: number
}
