import { Injectable } from '@nestjs/common'
import { FindManyOptions } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      ...createUserDto,
      refreshToken: 'fsdfsdfsdf'
    })
  }

  findAll(opt?: FindManyOptions<User>) {
    return this.userRepository.find(opt)
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }

  findAllWithCart(opt?: FindManyOptions<User>) {
    return this.userRepository.findAllWithCart(opt)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(id, updateUserDto)
    return user.raw?.[0]
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
