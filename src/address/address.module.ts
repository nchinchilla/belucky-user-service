import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { DatabaseModule } from '../database/database.module';
import { AddressService } from './services/address.service';

@Module({
  imports: [DatabaseModule, CoreModule],
  controllers: [],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
