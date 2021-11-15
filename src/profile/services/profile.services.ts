import { Inject, Injectable } from '@nestjs/common';
import { Entities } from '../../entities/entities.constants';
//import { AddressRepository } from 'src/database/repositories/address.repository';
import { Profile } from '../../entities/profile.entity';
import { ProfileRepository } from '../../database/repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(Entities.ENTITY_PROFILE)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(profile: Profile): Promise<number> {
    return await this.profileRepository.create(profile);
  }
}
