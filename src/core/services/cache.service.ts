import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CacheKeys } from '../constants/cache-keys.constant';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: any) {}
  deleteKey(key: string | string[]): void | Promise<void> {
    return this.cacheManager.del(key);
  }

  getKeys(keyPattern: string): string[] {
    return this.cacheManager.keys(keyPattern);
  }

  async deleteKeysByPattern(keyPattern: string): Promise<void> {
    const keys = await this.getKeys(keyPattern);

    if (keys.length !== 0) {
      await this.deleteKey(keys);
    }
  }

  getUserKey(userId: string) {
    return CacheKeys.USER_KEY.replace(':id', userId);
  }
}
