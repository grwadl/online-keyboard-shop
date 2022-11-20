import { Keyboard } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  constructor(keyboard: Keyboard, user: User) {
    this.product = keyboard;
    this.user = user;
    this.quantity = 1;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.cart, { cascade: true })
  user: User;

  @ManyToOne(() => Keyboard, { cascade: true })
  product: Keyboard;
}
