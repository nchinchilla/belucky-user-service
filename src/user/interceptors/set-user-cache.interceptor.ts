import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Injectable()
export class SetUserCacheInterceptor extends CacheInterceptor {
  constructor(
    cacheManager: any,
    reflector: any,
    private readonly userService: UserService,
  ) {
    super(cacheManager, reflector);
  }
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();

    const { id } = request.params;

    return this.userService.getUserCacheKey(id);
  }
}
