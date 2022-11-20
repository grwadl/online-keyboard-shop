import {
  applyDecorators,
  BadRequestException,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

const ALLOW_UNAUTH = 'allowUnauthorizedRequest'
const Public = (dec: MethodDecorator) =>
  applyDecorators(SetMetadata(ALLOW_UNAUTH, true), dec)

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {
    super()
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const handler = context.getHandler()
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      ALLOW_UNAUTH,
      handler
    )
    return allowUnauthorizedRequest || this.validateToken(request)
  }

  validateToken(req) {
    const { headers } = req
    const token = headers?.authorization?.split('Bearer ')?.at(1)
    if (!token) throw new BadRequestException()

    try {
      const payload = this.jwtService.verify(token)
      req.user = payload
      return payload && 'email' in payload
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
export { ALLOW_UNAUTH, JwtAuthGuard, Public }
