import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { DatabaseModule } from '../database/database.module';
import { ProfileService } from './services/profile.services';

@Module({
  imports: [DatabaseModule, CoreModule],
  controllers: [],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
