import { BadRequestException } from '@nestjs/common';
import { UserExceptionsMessages } from '../constants/exceptions-messages.constant';

export class UserNameAlreadyExistsException extends BadRequestException {
  constructor(
    message: string = UserExceptionsMessages.USER_ALREADY_EXISTS,
    error?: string,
  ) {
    super(message, error);
  }
}
