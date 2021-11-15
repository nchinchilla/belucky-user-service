import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { CustomUnauthorizedExceptionMessage } from '../constants/custom-unauthorized-exception-message.constant';

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(message?: string) {
    const statusCode: number = HttpStatus.UNAUTHORIZED;
    if (!message) {
      message = CustomUnauthorizedExceptionMessage.CUSTOM_UNAUTHORIZED_EXCEPTION_MESSAGE;
    }
    super({ message, statusCode });
  }
}
