import {
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { v4 as uuid } from 'uuid'
import { CreateUserDto, LogInUserDto } from '../user/dto/create-user.dto'
import { UserService } from '../user/user.service'
@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  validate<T extends object>(token: string): T {
    return this.jwtService.verify(token)
  }

  async login(user: LogInUserDto): Promise<User & { token: string }> {
    const { password, email } = user
    const [possibleUser] = await this.userService.findAll({ where: { email } })

    if (!possibleUser || !bcrypt.compare(password, possibleUser.password))
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
    const token: string = this.jwtService.sign(
      { email, id: possibleUser.id },
      { expiresIn: '1m' }
    )
    if (!possibleUser.refreshToken) {
      const id = uuid() as string
      const newToken = this.jwtService.sign(id)
      const res = await this.userService.update(possibleUser.id, {
        refreshToken: newToken
      })
      return { ...res, token }
    }
    return { ...possibleUser, token }
  }

  async relogin(refreshToken: string) {
    const [possibleUser] = await this.userService.findAll({
      where: [{ refreshToken }]
    })
    if (!possibleUser) throw new UnauthorizedException()

    const token: string = this.jwtService.sign(
      { email: possibleUser.email, id: possibleUser.id },
      { expiresIn: '3m' }
    )

    return { ...possibleUser, token }
  }

  async register(user: CreateUserDto) {
    const { email, password } = user
    const [possibleUser] = await this.userService.findAll({
      where: [{ email }]
    })
    if (possibleUser)
      throw new HttpException('This user already exist', HttpStatus.BAD_REQUEST)

    return this.userService.create({
      ...user,
      password: await bcrypt.hash(password, 10)
    })
  }
}
