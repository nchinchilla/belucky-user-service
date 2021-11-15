import { Logger, Inject } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { UserDto } from '../../user/dtos/user.dto';
import { AddressRepository } from './address.repository';
import { Connection } from 'mysql';
import { ProfileRepository } from './profile.repository';
import { Address } from '../../entities/address.entity';
import { Profile } from '../../entities/profile.entity';

export class UserRepository {
  constructor(
    @Inject('DATABASE_POOL') private db: Connection,
    private readonly addressRepository: AddressRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}
  async findById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.query(
        `Select * from user where id=${id}`,
        function (error, results) {
          if (error) {
            Logger.error(error);
            reject(error);
          }

          resolve(results);
        },
      );
    });
  }

  async createFullUser(
    user: CreateUserDto,
  ): Promise<{ userId: number; username: string }> {
    try {
      new Promise((resolve, reject) => {
        this.db.beginTransaction((error) => {
          if (error) {
            return this.db.rollback(() => {
              reject(error);
            });
          }
        });
      });

      const newUser = new User(user.username, user.password);
      const userId = await this.createUser(newUser);
      const newAddress = new Address(user.cityId, user.street);
      const addressId = await this.addressRepository.create(newAddress);

      const newProfile = new Profile(+userId, addressId, user.name);
      await this.profileRepository.create(newProfile);

      this.db.commit((err) => {
        if (err) {
          return this.db.rollback(function () {
            throw err;
          });
        }
      });

      return { userId: +userId, username: user.username };
    } catch (error) {
      new Promise((resolve, reject) => {
        this.db.rollback(() => {
          reject(error);
        });
      });
      return error;
    }
  }

  async createUser(user: User): Promise<number> {
    return await new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO user SET ?`, user, (error, results) => {
        if (error) {
          Logger.error(`Error in query to database ${error}`);
          reject(error);
        }
        resolve(results.insertId);
      });
    });
  }

  async query(query: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.db.query(query, function (error, results) {
        if (error) {
          Logger.error(`Error in query to database ${error}`);
          reject(error);
        }

        resolve(results);
      });
    });
  }

  async findUserByUsername(username: string): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      this.db.query(
        `Select * from user where  username = '${username}'`,
        function (error, results) {
          if (error) {
            Logger.error(`Error in query to database ${error}`);
            reject(error);
          }

          resolve(results[0]);
        },
      );
    });
  }

  async findUser(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.query(
        `Select us.id as userId, prof.name as profileName, ad.street as streetName, city.name as cityName, coun.name as countryName from user as us inner join profile as prof on us.id = prof.userId  inner join address as ad on prof.addressId = ad.id inner join city as city on ad.cityId = city.id inner join country as coun on city.countryId = coun.id where  us.id = ${userId}`,
        function (error, results) {
          if (error) {
            Logger.error(`Error in query to database ${error}`);
            reject(error);
          }
          resolve(results[0]);
        },
      );
    });
  }
}
