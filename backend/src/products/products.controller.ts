import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth-guard';
import { QueryParserService } from 'src/query-parser/query-parser.service';
import { ParseQueryPipe } from './custom.validation.pipe';
import { FilterProduct } from './dto/filter.product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private queryParserService: QueryParserService
  ) {}
  @Public(Get())
  getAll(
    @Query(new ParseQueryPipe<typeof FilterProduct>())
    params: FilterProduct
  ) {
    const transformedParams = this.queryParserService.transformQuery(
      params as Record<string, any>
    );

    return this.productService.get(transformedParams);
  }

  @Public(Get(':id'))
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOne({ where: { id } });
  }
}
