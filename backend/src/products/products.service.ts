import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { Keyboard } from './entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Keyboard) private keyboardRepository: Repository<Keyboard>
  ) {}
  get(params?: FindManyOptions<Keyboard>) {
    return this.keyboardRepository.find(params)
  }

  getOne(params: FindOneOptions<Keyboard>) {
    return this.keyboardRepository.findOne(params)
  }
}
