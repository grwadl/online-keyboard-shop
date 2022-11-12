import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  get() {}

  @Get(':id')
  getOne(@Param() { id }) {}
}
