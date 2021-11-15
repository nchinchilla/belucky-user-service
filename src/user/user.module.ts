import { Module } from '@nestjs/common';
import { AddressModule } from '../address/address.module';
import { ProfileModule } from '../profile/profile.module';
import { CoreModule } from '../core/core.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule, CoreModule, ProfileModule, AddressModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
