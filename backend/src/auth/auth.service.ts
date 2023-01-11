import {
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from '@src/email-service/email.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { v4 as uuid } from 'uuid'
import { CreateUserDto, LogInUserDto } from '../user/dto/create-user.dto'
import { UserService } from '../user/user.service'

const ACCESS_TOKEN_LIFETIME = '120s'
const REFRESH_TOKEN_LIFETIME = '30d'

@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async validate<T extends object>(token: string): Promise<T | false> {
    try {
      return (await this.jwtService.verifyAsync(token)) as T
    } catch (e) {
      return false
    }
  }

  async login(user: LogInUserDto): Promise<User & { token: string }> {
    const { password, email } = user
    const [possibleUser] = await this.userService.findAll({
      where: { email }
    })

    if (!possibleUser)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)

    const isCorrectPassword = await bcrypt.compare(
      password,
      possibleUser?.password
    )

    if (!isCorrectPassword)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)

    const accessToken: string = this.jwtService.sign(
      { email, id: possibleUser.id },
      { expiresIn: ACCESS_TOKEN_LIFETIME }
    )

    const isValid = await this.validate(possibleUser.refreshToken)

    if (!isValid) {
      const id = uuid() as string
      const newRefreshToken = this.jwtService.sign(
        { id },
        { expiresIn: REFRESH_TOKEN_LIFETIME }
      )
      await this.userService.update(possibleUser.id, {
        refreshToken: newRefreshToken
      })

      return {
        ...possibleUser,
        refreshToken: newRefreshToken,
        token: accessToken
      }
    }

    return { ...possibleUser, token: accessToken }
  }

  async relogin(refreshToken: string) {
    const isValid = await this.validate(refreshToken)

    if (!isValid) return null

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
  }

  async register(user: CreateUserDto) {
    const { email, password } = user
    const [possibleUser] = await this.userService.findAll({
      where: [{ email }]
    })
    if (possibleUser)
      throw new HttpException('This user already exist', HttpStatus.BAD_REQUEST)

    this.emailService.sendEmail({
      html: `<h1>confirm your email by clicking this link below</h1> <a href="${process.env.API_URL}user/confirm/{token}">Confirm your email</a>`,
      recipients: [
        {
          Email: email,
          Fields: {
            token: this.jwtService.sign({
              ...user,
              password: await bcrypt.hash(password, 3)
            })
          }
        }
      ],
      subject: 'confirm your registration'
    })
  }

  async confirmEmail(token: string) {
    try {
      const user = (await this.jwtService.verify(token)) as CreateUserDto
      if (!user.email || !user.password)
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST)

      const [possibleUser] = await this.userService.findAll({
        where: { email: user.email }
      })
      if (possibleUser)
        throw new HttpException('Already exists', HttpStatus.BAD_REQUEST)

      return this.userService.create({
        ...user,
        refreshToken: token
      })
    } catch (_) {
      return null
    }
  }
}
