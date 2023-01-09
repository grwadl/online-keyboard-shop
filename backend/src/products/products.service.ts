import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { Keyboard } from './entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Keyboard) private keyboardRepository: Repository<Keyboard>
  ) {}

  get(params?: FindManyOptions<Keyboard>): Promise<[Keyboard[], number]> {
    return this.keyboardRepository.findAndCount({ ...params, cache: true })
  }

  getOne(params: FindOneOptions<Keyboard>) {
    return this.keyboardRepository.findOne({ ...params, cache: true })
  }

  getQuantity() {
    return this.keyboardRepository.count({ cache: true })
  }
}
