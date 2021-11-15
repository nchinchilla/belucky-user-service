import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '../config/services/config.service';
import { AuthGuard } from './guards/auth.guard';
import { CacheService } from './services/cache.service';
import { CryptService } from './services/crypt.service';
import { CustomJwtService } from './services/custom-jwt.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('CACHE_HOST'),
        port: configService.get('CACHE_PORT'),
        ttl: configService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthGuard, CustomJwtService, CacheService, CryptService],
  exports: [
    CacheModule,
    AuthGuard,
    CustomJwtService,
    CacheService,
    CryptService,
  ],
})
export class CoreModule {}
