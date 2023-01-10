import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { Public } from 'src/auth/jwt-auth-guard'
import { CreateUserDto, LogInUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

const cookieOptions = {
  domain: 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 36000000
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Public(Post('sign-up'))
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.authService.register(createUserDto)
    res.status(201).send({ message: 'Now confirm your email' })
  }

  @Public(Post('sign-in'))
  async signIn(
    @Res({ passthrough: true }) res,
    @Body() signInDto: LogInUserDto
  ): Promise<User> {
    const { refreshToken, ...user } = await this.authService.login(signInDto)
    res.cookie('refreshToken', refreshToken, cookieOptions)
    return user
  }

  @Public(Get('log-out'))
  async logOut(@Res() res: Response) {
    res.clearCookie('refreshToken', cookieOptions)
    return res.status(200).send({ message: 'logged out' })
  }

  @Public(Get('refresh'))
  async signInAgain(
    @Req() { cookies }: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const token = cookies['refreshToken']

    if (!token) throw new UnauthorizedException()

    const user = await this.authService.relogin(token)
    if (!user) {
      res.clearCookie('refreshToken', cookieOptions)
      throw new UnauthorizedException()
    }
    return user
  }

  @Public(Get('confirm/:token'))
  async confirmMail(
    @Param('token') token: string,
    @Req() { cookies }: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const possibleRefreshToken = cookies['refreshToken']
    if (possibleRefreshToken) return res.redirect(process.env.SITE_URL)
    const candidate = await this.authService.confirmEmail(token)

    if (!candidate) return res.redirect(process.env.SITE_URL)

    res
      .cookie('refreshToken', candidate.refreshToken, cookieOptions)
      .redirect(process.env.SITE_URL)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id)
  }
}
