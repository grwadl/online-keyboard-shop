import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum KeyboardType {
  MECHANICAL = 'mechanical',
  MEMBRANIC = 'membranic',
  OPTICAL = 'optical'
}

export enum Switches {
  RED = 'red',
  BLUE = 'blue',
  BROWN = 'brown'
}

export interface IKeyboard {
  id: number
  type: KeyboardType
  switches?: Switches
  keycaps: string
  image?: string
  name?: string
}

@Entity()
export class Keyboard implements IKeyboard {
  constructor(id: number) {
    this.id = id
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: KeyboardType

  @Column()
  switches?: Switches

  @Column()
  keycaps: string

  @Column()
  image?: string

  @Column()
  name: string

  @Column()
  price: number

  @Column('text')
  desc: string

  @Column('text')
  excerpt: string
}
