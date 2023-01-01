import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

class CreateUserDto {
  @IsEmail()
  email: string
  @IsNotEmpty()
  password: string
}

class LogInUserDto {
  @IsString()
  password: string
  @IsEmail()
  email: string
}

export { CreateUserDto, LogInUserDto }
