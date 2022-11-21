import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Keyboard } from 'src/products/entities/product.entity'
import { User } from 'src/user/entities/user.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateCartWithUserDto } from './dto/create-cart.dto'
import { UpdateCartDto } from './dto/update-cart.dto'
import { Cart } from './entities/cart.entity'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>
  ) {}

  async create({ user: customer, product }: CreateCartWithUserDto) {
    const user = new User(customer.id)
    const keyboard = new Keyboard(product.id)
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
