import { Controller, Get, Param } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Keyboard } from './entities/product.entity';
import { ProductsService } from './products.service';

type GetOneParams = {
  id: number;
};

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  getAll(@Param() params: FindManyOptions<Keyboard>) {
    return this.productService.get(params);
  }

  @Get(':id')
  getOne(@Param() { id }: GetOneParams) {
    return this.productService.getOne({ where: { id } });
  }
}
