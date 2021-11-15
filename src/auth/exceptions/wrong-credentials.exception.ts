import { BadRequestException } from '@nestjs/common';
import { UserExceptionsMessages } from '../../user/constants/exceptions-messages.constant';

export class WrongCredentialsException extends BadRequestException {
  constructor() {
    super(UserExceptionsMessages.ERROR_WRONG_CREDENTIALS);
  }
}
