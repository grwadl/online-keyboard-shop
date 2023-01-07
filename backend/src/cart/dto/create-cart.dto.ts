import { IsNumber } from 'class-validator'

class CreateCartDtoProduct {
  @IsNumber()
  id: number
}

export { CreateCartDtoProduct }
