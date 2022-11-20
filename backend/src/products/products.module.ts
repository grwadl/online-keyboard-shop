import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QueryParserService } from 'src/query-parser/query-parser.service'
import { Keyboard } from './entities/product.entity'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Keyboard])],
  controllers: [ProductsController],
  providers: [ProductsService, QueryParserService]
})
export class ProductsModule {}
