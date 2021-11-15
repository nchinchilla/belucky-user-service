import { BadRequestException } from '@nestjs/common';
import { UserExceptionsMessages } from '../constants/exceptions-messages.constant';

export class UserNotCreatedException extends BadRequestException {
  constructor(
    message: string = UserExceptionsMessages.USER_NOT_CREATED,
    error?: string,
  ) {
    super(message, error);
  }
}
