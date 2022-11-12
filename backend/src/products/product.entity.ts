import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface IKeyboard {
  id: number;
  type: 'mechanical' | 'membranic' | 'optical';
  switches?: 'red' | 'blue' | 'brown';
}

@Entity()
export class Keyboard implements IKeyboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'mechanical' | 'membranic' | 'optical';

  @Column()
  switches?: 'red' | 'blue' | 'brown';
}
