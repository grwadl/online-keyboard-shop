import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { User } from 'src/user/entities/user.entity'

@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  validate<T extends object>(token: string): T {
    return this.jwtService.verify(token)
  }

  async login(user: Partial<CreateUserDto>): Promise<User & { token: string }> {
    const { password, email } = user
    const [possibleUser] = await this.userService.findAll({ where: { email } })
    if (!possibleUser || !bcrypt.compare(password, possibleUser.password))
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
    const token: string = this.jwtService.sign({ email, id: possibleUser.id })
    return { ...possibleUser, token }
  }

  async register(user: CreateUserDto) {
    const { phone, email, password } = user
    const [possibleUser] = await this.userService.findAll({
      where: [{ email }, { phone }]
    })
    if (possibleUser)
      throw new HttpException('This user already exist', HttpStatus.BAD_REQUEST)

    return this.userService.create({
      ...user,
      password: await bcrypt.hash(password, 10)
    })
  }
}
