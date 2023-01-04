import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartModule } from '@src/cart/cart.module'
import { Order } from './entities/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
