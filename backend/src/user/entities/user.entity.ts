import { Cart } from 'src/cart/entities/cart.entity'
import { Keyboard } from 'src/products/entities/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

export interface IUser {
  name: string
  email: string
  phone: string
  password: string
  cart: Cart[]
}

@Entity()
export class User implements IUser {
  constructor(id: number) {
    this.id = id
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[]
}
