import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductsService } from '@src/products/products.service'
import { User } from 'src/user/entities/user.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { UpdateCartDto } from './dto/update-cart.dto'
import { Cart } from './entities/cart.entity'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private readonly productService: ProductsService
  ) {}

  async create({ userId, id }: Record<string, number>) {
    const user = new User(userId)
    const keyboard = await this.productService.getOne({ where: { id } })
    if (!keyboard) throw new BadRequestException('keyboard not found')
    const newCart = new Cart(keyboard, user)
    return this.cartRepository.save(newCart)
  }

  async findAll(opt?: FindManyOptions<Cart>) {
    return this.cartRepository.find(opt)
  }

  async findOne(id: number) {
    return this.cartRepository.findOne({ where: { id } })
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    await this.cartRepository.update(id, updateCartDto)
    return await this.findOne(id)
  }

  async remove(id: number) {
    return this.cartRepository.delete(id)
  }
}
