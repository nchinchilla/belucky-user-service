import { Logger } from '@nestjs/common';
import { Address } from '../../entities/address.entity';
import { RepositoryBase } from './repository-base';

export class AddressRepository extends RepositoryBase<Address> {
  findById(id: number): Promise<Address> {
    throw new Error('Method not implemented.');
  }

  create(addresss: Address): Promise<number> {
    const values = {
      cityId: addresss.getCityId(),
      street: addresss.getStreet(),
    };

    return new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO address SET ?`,
        values,
        function (error, results) {
          if (error) {
            Logger.error(error);
            reject(error);
          }

          resolve(results.insertId);
        },
      );
    });
  }

  query(query: string): Promise<Address[]> {
    throw new Error('Method not implemented.');
  }
}
