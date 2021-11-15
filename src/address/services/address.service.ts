import { Inject, Injectable } from '@nestjs/common';
import { Entities } from '../../entities/entities.constants';
import { AddressRepository } from '../../database/repositories/address.repository';
import { Address } from '../../entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject(Entities.ENTITY_ADDRESS)
    private readonly addressRespository: AddressRepository,
  ) {}

  async create(address: Address): Promise<number> {
    return await this.addressRespository.create(address);
  }
}
