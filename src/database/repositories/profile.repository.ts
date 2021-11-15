import { Logger } from '@nestjs/common';
import { Profile } from '../../entities/profile.entity';
import { RepositoryBase } from './repository-base';

export class ProfileRepository extends RepositoryBase<Profile> {
  findById(id: number): Promise<Profile> {
    throw new Error('Method not implemented.');
  }

  create(profile: Profile): Promise<number> {
    const values = {
      userId: profile.getUserId(),
      addressId: profile.getAddressId(),
      name: profile.getName(),
    };

    return new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO profile SET ?`,
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

  query(params: string): Promise<Profile[]> {
    throw new Error('Method not implemented.');
  }
}
