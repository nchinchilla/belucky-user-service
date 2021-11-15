import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql';
import { DeepPartial } from 'typeorm';

@Injectable()
export abstract class RepositoryBase<T> {
  public readonly db: Connection;
  constructor(@Inject('DATABASE_POOL') private conn: Connection) {
    this.db = conn;
  }

  abstract findById(id: number): Promise<T>;

  abstract create(entity: DeepPartial<T>): Promise<number>;

  abstract query(query: string): Promise<T[]>;
}
