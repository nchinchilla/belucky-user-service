import { Inject, Injectable, Logger } from '@nestjs/common';
import { CryptService } from '../../core/services/crypt.service';
import { UserRepository } from '../../database/repositories/user.repository';
import { Entities } from '../../entities/entities.constants';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserNotCreatedException } from '../exceptions/create-user.exception';
import { UserNameAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UserWithAddressDto } from '../dtos/user-with-address.dto';
import { CacheService } from '../../core/services/cache.service';
import { isEmpty } from 'lodash';
import { UserNotExistsException } from '../exceptions/user-not-exists.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly cacheService: CacheService,
  ) {}

  async createUser(
    userDto: CreateUserDto,
  ): Promise<{ userId: number; username: string }> {
    try {
      const usernameExists = await this.ifUsernameExists(userDto.username);

      if (usernameExists) {
        throw new UserNameAlreadyExistsException();
      }

      const password = await this.cryptService.crypt(userDto.password);

      const res = await this.userRepository.createFullUser({
        ...userDto,
        password,
      });

      return res;
    } catch (error) {
      Logger.error(`Error to attempt insert a new user: ${error}`);
      throw new UserNotCreatedException(error);
    }
  }

  async ifUsernameExists(username: string): Promise<boolean> {
    const res = await this.userRepository.query(
      `SELECT * FROM user WHERE USERNAME = '${username}'`,
    );

    if (res.length > 0) {
      return true;
    }

    return false;
  }

  async getUser(userId: number): Promise<UserWithAddressDto> {
    try {
      const res = await this.userRepository.findUser(userId);

      if (isEmpty(res)) {
        throw new UserNotExistsException();
      }

      return {
        id: res.userId,
        name: res.profileName,
        address: {
          street: res.streetName,
          city: res.cityName,
          country: res.countryName,
        },
      };
    } catch (error) {
      Logger.error(`Error to attempt get new user: ${error}`);
      throw new UserNotExistsException(error);
    }
  }

  getUserCacheKey(userId: string) {
    return this.cacheService.getUserKey(userId);
  }
}
