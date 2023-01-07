import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { EmailModule } from '@src/email-service/email.module'
import { JWT } from 'src/jwt/jwt.module'
import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'

@Module({
  imports: [forwardRef(() => UserModule), PassportModule, JWT, EmailModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
