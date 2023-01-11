import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',

      verifyOptions: { ignoreExpiration: false }
    })
  ],
  exports: [JwtModule]
})
export class JWT {}
