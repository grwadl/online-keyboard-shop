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

const ACCESS_TOKEN_LIFETIME = 300000
const REFRESH_TOKEN_LIFETIME = 30 * 86400000

@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService
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

    const accessToken: string = this.jwtService.sign(
      { email, id: possibleUser.id },
      { expiresIn: ACCESS_TOKEN_LIFETIME }
    )

    if (!possibleUser.refreshToken) {
      const id = uuid() as string
      const newRefreshToken = this.jwtService.sign(
        { id },
        { expiresIn: REFRESH_TOKEN_LIFETIME }
      )
      possibleUser = await this.userService.update(possibleUser.id, {
        refreshToken: newRefreshToken
      })
    }

    return { ...possibleUser, token: accessToken }
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
