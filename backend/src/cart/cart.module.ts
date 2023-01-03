import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsModule } from '@src/products/products.module'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { Cart } from './entities/cart.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductsModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
