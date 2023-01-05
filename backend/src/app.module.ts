import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Keyboard } from './products/entities/product.entity'
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth-guard'
import { JWT } from './jwt/jwt.module'
import { CartModule } from './cart/cart.module'
import { QueryParserService } from './query-parser/query-parser.service'
import { OrderModule } from './order/order.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Keyboard],
      autoLoadEntities: true,
      synchronize: true
    }),
    JWT,
    forwardRef(() => UserModule),
    ProductsModule,
    UserModule,
    AuthModule,
    CartModule,
    OrderModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    QueryParserService
  ]
})
export class AppModule {}
