import { IsNumber } from 'class-validator'

class CreateCartDtoUser {
  @IsNumber()
  id: number
}

class CreateCartDtoProduct {
  @IsNumber()
  id: number
}

export { CreateCartDtoProduct }
