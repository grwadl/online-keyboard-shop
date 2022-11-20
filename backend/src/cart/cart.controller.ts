import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { CartService } from './cart.service';
import { CreateCartDto, CreateCartWithUserDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

type UserReq = {
  id: number;
  email: string;
};

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto, @User() { id }: UserReq) {
    const cartDto: CreateCartWithUserDto = { ...createCartDto, user: { id } };
    return await this.cartService.create(cartDto);
  }

  @Get()
  async findAll(@User() { id }: UserReq) {
    return await this.cartService.findAll({ where: { user: { id } } });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return await this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.remove(+id);
  }
}
