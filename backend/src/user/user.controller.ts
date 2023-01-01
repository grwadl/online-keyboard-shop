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
import { Request } from 'express'
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
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto)
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

  @Public(Get('refresh'))
  async signInAgain(@Req() { cookies }: Request): Promise<User> {
    const token = cookies['refreshToken']

    if (!token) throw new UnauthorizedException()

    return await this.authService.relogin(token)
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
