import { Cart } from 'src/cart/entities/cart.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

export interface IUser {
  email: string
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
  email: string

  @Column()
  password: string

  @Column()
  refreshToken?: string

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[]
}
