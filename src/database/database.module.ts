import { Logger, Module } from '@nestjs/common';
import { createConnection } from 'mysql';
import { ConfigService } from '../config/services/config.service';
import { Entities } from '../entities/entities.constants';
import { AddressRepository } from './repositories/address.repository';
import { CityRepository } from './repositories/city.repository';
import { CountryRepository } from './repositories/country.repository';
import { ProfileRepository } from './repositories/profile.repository';
import { UserRepository } from './repositories/user.repository';

const databasePoolFactory = async (configService: ConfigService) => {
  console.log('****** ' + configService.get('DB_HOST'));
  const connection = new createConnection({
    host: configService.get('DB_HOST'),
    user: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
  });

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    Logger.log(`Database connected with id:  ${connection.threadId}`);
  });

  return connection;
};

@Module({
  imports: [],
  providers: [
    UserRepository,
    ProfileRepository,
    AddressRepository,
    CityRepository,
    CountryRepository,

    {
      provide: 'DATABASE_POOL',
      useFactory: databasePoolFactory,
      inject: [ConfigService],
    },
    {
      provide: Entities.ENTITY_USER,
      useClass: UserRepository,
    },
    {
      provide: Entities.ENTITY_PROFILE,
      useClass: ProfileRepository,
    },
    {
      provide: Entities.ENTITY_ADDRESS,
      useClass: AddressRepository,
    },
    {
      provide: Entities.ENTITY_CITY,
      useClass: CityRepository,
    },
    {
      provide: Entities.ENTITY_COUNTRY,
      useClass: CountryRepository,
    },
  ],
  exports: [
    'user',
    'address',
    'profile',
    'city',
    'country',
    UserRepository,
    ProfileRepository,
    AddressRepository,
    CityRepository,
    CountryRepository,
  ],
})
export class DatabaseModule {}
