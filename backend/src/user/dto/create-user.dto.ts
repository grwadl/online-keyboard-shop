import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { IUser } from '../entities/user.entity';

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsMobilePhone()
  phone: string;
  @IsNotEmpty()
  password: string;
}
