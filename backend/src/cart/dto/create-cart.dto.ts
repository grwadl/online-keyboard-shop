import { IsNumber, IsPositive } from 'class-validator'
import { ValidateObject } from 'src/nested-validator'

class CreateCartDtoUser {
  @IsNumber()
  id: number
}

class CreateCartDtoProduct {
  @IsNumber()
  id: number
}

class CreateCartDto {
  @ValidateObject(CreateCartDtoProduct)
  product: CreateCartDtoProduct
  @IsNumber()
  @IsPositive()
  quantity: number
}

class CreateCartWithUserDto extends CreateCartDto {
  @ValidateObject(CreateCartDtoUser)
  user: CreateCartDtoUser
}

export { CreateCartWithUserDto, CreateCartDto }
