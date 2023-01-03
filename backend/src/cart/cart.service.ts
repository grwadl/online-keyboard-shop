import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductsService } from '@src/products/products.service'
import { User } from 'src/user/entities/user.entity'
import { FindManyOptions } from 'typeorm'
import { UpdateCartDto } from './dto/update-cart.dto'
import { Cart } from './entities/cart.entity'
import { CartRepository } from './repository/cart.repository'

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductsService
  ) {}

  async create({ userId, id }: Record<string, number>) {
    const user = new User(userId)
    const keyboard = await this.productService.getOne({ where: { id } })
    if (!keyboard) throw new BadRequestException('keyboard not found')
    const newCart = new Cart(keyboard, user)
    const cart = await this.cartRepository.save(newCart)
    return cart
  }

  async findAll(opt?: FindManyOptions<Cart>) {
    return this.cartRepository.find({ ...opt, relations: { product: true } })
  }

  async findOne(id: number) {
    return this.cartRepository.findOne({
      where: { id },
      relations: { product: true }
    })
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    await this.cartRepository.update(id, updateCartDto)
    return await this.findOne(id)
  }

  async remove(id: number) {
    return this.cartRepository.delete(id)
  }
}
