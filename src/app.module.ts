import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CoreModule,
    ConfigModule,
    AuthModule,
    ProfileModule,
    AddressModule,
  ],
})
export class AppModule {}
