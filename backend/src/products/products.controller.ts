import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  get() {
    return 1;
  }

  @Get(':id')
  getOne(@Param() { id }) {
    return 2;
  }
}
