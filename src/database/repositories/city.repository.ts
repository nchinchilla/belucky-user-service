import { Logger } from '@nestjs/common';
import { City } from '../../entities/city.entity';
import { RepositoryBase } from './repository-base';

export class CityRepository extends RepositoryBase<City> {
  findById(id: number): Promise<City> {
    throw new Error('Method not implemented.');
  }

  create(city: City): Promise<number> {
    const values = {
      countryId: city.getcountryId(),
      name: city.getName(),
    };

    return new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO city SET ?`,
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

  query(params: string): Promise<City[]> {
    throw new Error('Method not implemented.');
  }
}
