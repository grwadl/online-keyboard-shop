import { Injectable } from '@nestjs/common'
import { AbstractRepository } from '@src/abstract-repository'
import { DataSource, FindManyOptions } from 'typeorm'
import { Cart } from '../entities/cart.entity'

@Injectable()
class CartRepository extends AbstractRepository<Cart> {
  constructor(private dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager())
  }

  async findCartProducts(opt: FindManyOptions<Cart>): Promise<Cart[]> {
    const builder = this.dataSource
      .getTreeRepository(Cart)
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.product', 'product')

    const builderWithQuery = this.buildQuery(opt, builder)
    return builderWithQuery.getMany()
  }
}

export { CartRepository }
