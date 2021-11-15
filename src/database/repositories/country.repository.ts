import { Logger } from '@nestjs/common';
import { Country } from '../../entities/country.entity';
import { RepositoryBase } from './repository-base';

export class CountryRepository extends RepositoryBase<Country> {
  findById(id: number): Promise<Country> {
    throw new Error('Method not implemented.');
  }

  create(country: Country): Promise<number> {
    const values = {
      name: country.getName(),
    };

    return new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO country SET ?`,
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

  query(params: string): Promise<Country[]> {
    throw new Error('Method not implemented.');
  }
}
