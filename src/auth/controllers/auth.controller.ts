import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthExposedHeader } from '../../core/dtos/auth-exposed-headers.constant';
import { UserDto } from '../../user/dtos/user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private readonly databaseService: DatabaseService,
  ) {}

  @Post('login')
  async login(@Body() userDto: UserDto, @Res() res) {
    const authUser = await this.authService.login(userDto);

    res
      .header(AuthExposedHeader.JWT_HEADER, authUser.jwt)
      .send({ username: authUser.username });
  }
}
