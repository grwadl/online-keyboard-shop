import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum KeyboardType {
  MECHANICAL = 'mechanical',
  MEMBRANIC = 'membranic',
  OPTICAL = 'optical'
}

enum Switches {
  RED = 'red',
  BLUE = 'blue',
  BROWN = 'brown'
}

export interface IKeyboard {
  id: number;
  type: KeyboardType;
  switches?: Switches;
  keycaps: string;
}

@Entity()
export class Keyboard implements IKeyboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: KeyboardType;

  @Column()
  switches?: Switches;

  @Column()
  keycaps: string;
}
