import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { ForceLogoutErrorCode } from '../../core/constants/force-logout-error-code.constant';

export class UnauthorizedForceLogoutException extends UnauthorizedException {
  constructor(message?: string) {
    const errorCode: number = ForceLogoutErrorCode.FORCE_LOGOUT;
    const statusCode: number = HttpStatus.UNAUTHORIZED;
    super({ message, errorCode, statusCode });
  }
}
