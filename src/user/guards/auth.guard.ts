import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomJwtService } from '../../core/services/custom-jwt.service';
import { BadTokenException } from '../exceptions/bad-token.exception';
import { JwtResponseDto } from '../dtos/jwt-response.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly customJwtService: CustomJwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const user: JwtResponseDto =
        this.customJwtService.getUserFromJwtInRequest(request);
      request.user = user;
      return true;
    } catch (err) {
      if (err instanceof BadTokenException) {
        throw err;
      }
      throw new UnauthorizedException();
    }
  }
}
