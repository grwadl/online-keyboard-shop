import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe
} from '@nestjs/common'
import { User as UserReq } from 'src/user/user.decorator'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthService } from 'src/auth/auth.service'
import { Public } from 'src/auth/jwt-auth-guard'
import { User } from './entities/user.entity'

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
  async signIn(@Body() signInDto: Partial<CreateUserDto>): Promise<User> {
    return await this.authService.login(signInDto)
  }

  @Get('again')
  async signInAgain(@UserReq() { id }): Promise<User> {
    return await this.userService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto).then((res) => res.raw[0])
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id)
  }
}
