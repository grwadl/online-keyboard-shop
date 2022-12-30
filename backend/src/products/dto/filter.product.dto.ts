import { IsOptional } from 'class-validator'
import { KeyboardType, Switches } from '../entities/product.entity'

class FilterProduct {
  @IsOptional()
  switches?: Switches | Switches[]

  @IsOptional()
  keycaps?: string

  @IsOptional()
  type?: KeyboardType | KeyboardType[]

  @IsOptional()
  name?: string

  @IsOptional()
  sort: string
}

export { FilterProduct }
