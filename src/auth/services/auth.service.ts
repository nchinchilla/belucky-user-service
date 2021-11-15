import { Inject, Injectable } from '@nestjs/common';
import { CryptService } from '../../core/services/crypt.service';
import { UserRepository } from '../../database/repositories/user.repository';
import { Entities } from '../../entities/entities.constants';
import { isEmpty } from 'lodash';
import { WrongCredentialsException } from '../exceptions/wrong-credentials.exception';
import { UserDto } from '../../user/dtos/user.dto';
import { AuthUser } from '../dtos/auth-user.dto';
import { CustomJwtService } from '../../core/services/custom-jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Entities.ENTITY_USER)
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly customJwtService: CustomJwtService,
  ) {}

  async login(userDto: UserDto): Promise<AuthUser> {
    const { username, password } = userDto;
    const user = await this.userRepository.findUserByUsername(username);
    if (isEmpty(user)) {
      throw new WrongCredentialsException();
    }
    const isPasswordValid = await this.cryptService.isHashValid(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new WrongCredentialsException();
    }
    const jwt = this.customJwtService.getJwt(user.id, user.username);
    const authUser = {
      id: user.id,
      username: user.username,
      jwt,
    };
    return authUser;
  }

  async getUser(userId: number) {
    return 'user ' + userId;
  }
}
