import { Injectable } from '@nestjs/common'
import { AbstractRepository } from '@src/abstract-repository'
import {
  DataSource,
  FindManyOptions,
  Repository,
  SelectQueryBuilder
} from 'typeorm'
import { User } from '../entities/user.entity'

@Injectable()
class UserRepository extends AbstractRepository<User> {
  readonly repository: Repository<User>

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
    this.repository = this.dataSource.getRepository(User)
  }

  async findAllWithCart(opt: FindManyOptions<User>) {
    const builder: SelectQueryBuilder<User> = await this.repository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.cart', 'cart')

    const builderWithWhere = this.buildQuery(opt, builder)
    return builderWithWhere.getMany()
  }
}

export { UserRepository }
