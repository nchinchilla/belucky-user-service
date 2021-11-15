import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserWithAddressDto } from '../dtos/user-with-address.dto';
import { SetUserCacheInterceptor } from '../interceptors/set-user-cache.interceptor';
import { UserService } from '../services/user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, // private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  @ApiOperation({
    description: 'Get user by userId by token.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(SetUserCacheInterceptor)
  getUser(@Req() req): Promise<UserWithAddressDto> {
    const { userId } = req.user;

    return this.userService.getUser(userId);
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Get user by userId on Params.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(SetUserCacheInterceptor)
  @ApiResponse({ type: UserWithAddressDto, status: HttpStatus.OK })
  getUserById(@Param('id') userId: number): Promise<UserWithAddressDto> {
    return this.userService.getUser(userId);
  }

  @Post()
  @ApiOperation({
    description: 'Create a new user.',
  })
  createUser(
    @Body() user: CreateUserDto,
  ): Promise<{ userId: number; username: string }> {
    return this.userService.createUser(user);
  }
}
