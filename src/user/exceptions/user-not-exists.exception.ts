import {  NotFoundException } from '@nestjs/common';
import { UserExceptionsMessages } from '../constants/exceptions-messages.constant';

export class UserNotExistsException extends NotFoundException {
  constructor(
    message: string = UserExceptionsMessages.ERRO_NOT_EXISTS,
    error?: string,
  ) {
    super(message, error);
  }
}
