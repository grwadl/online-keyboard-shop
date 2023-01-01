import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(id, updateUserDto)
    return user.raw?.[0]
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
