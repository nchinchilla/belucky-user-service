import { Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Promise<void> {
    return;
  }

  @Patch()
  updateName(): Promise<void> {
    return;
  }

  @Put()
  updateUser(): Promise<void> {
    return;
  }

  @Post()
  createUser(): Promise<void> {
    return;
  }
}
