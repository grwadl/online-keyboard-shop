import { IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  password?: string

  @IsOptional()
  refreshToken?: string

  @IsOptional()
  name?: string

  @IsOptional()
  postOffice?: string

  @IsOptional()
  city?: string
}
