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

const ACCESS_TOKEN_LIFETIME = 300000
const REFRESH_TOKEN_LIFETIME = 30 * 86400000

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
    let [possibleUser] = await this.userService.findAll({
      where: { email }
    })

    if (!possibleUser || !bcrypt.compare(password, possibleUser.password))
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
    const token: string = this.jwtService.sign(
      { email, id: possibleUser.id },
      { expiresIn: ACCESS_TOKEN_LIFETIME }
    )
    if (!possibleUser.refreshToken) {
      const id = uuid() as string
      const newToken = this.jwtService.sign(
        { id },
        { expiresIn: REFRESH_TOKEN_LIFETIME }
      )

      possibleUser = await this.userService.update(possibleUser.id, {
        refreshToken: newToken
      })
    }
    return { ...possibleUser, token }
  }

  async relogin(refreshToken: string) {
    try {
      this.validate(refreshToken)

      const [res] = await this.userService.findAll({
        where: [{ refreshToken }]
      })

      if (!res) throw new UnauthorizedException()
      const { refreshToken: _, ...possibleUser } = res
      const token: string = this.jwtService.sign(
        { email: possibleUser.email, id: possibleUser.id },
        { expiresIn: ACCESS_TOKEN_LIFETIME }
      )

      return { ...possibleUser, token }
    } catch (e) {
      console.error(e)
      return null
    }
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
