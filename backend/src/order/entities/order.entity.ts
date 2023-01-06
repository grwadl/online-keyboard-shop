import { Cart } from '@src/cart/entities/cart.entity'
import { User } from '@src/user/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
class Order {
  constructor(carts: Cart[], user: User) {
    this.carts = carts
    this.user = user
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  totalCheck: number

  @OneToMany(() => Cart, (cart) => cart.order)
  carts: Cart[]

  @ManyToOne(() => User, { cascade: true })
  user: User
}

export { Order }
