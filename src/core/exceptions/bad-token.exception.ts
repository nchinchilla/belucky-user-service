import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtConstant } from '../constants/jwt.constant';

export class BadTokenException extends UnauthorizedException {
  constructor(message?: string) {
    message = message || JwtConstant.EXPIRED_TOKEN_MESSAGE;
    const errorCode: number = JwtConstant.ERROR_CODE_EXPIRED_TOKEN_LOG_OUT;
    const statusCode: number = HttpStatus.UNAUTHORIZED;
    super({ message, errorCode, statusCode });
  }
}
