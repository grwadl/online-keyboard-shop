import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;
}
