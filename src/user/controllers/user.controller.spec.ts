import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../../core/services/cache.service';
import { CryptService } from '../../core/services/crypt.service';
import { User } from 'src/entities/user.entity';
import { CoreModule } from '../../core/core.module';
import { UserRepository } from '../../database/repositories/user.repository';
import { UserService } from '../services/user.service';
import { ConfigModule } from '../../config/config.module';
import { INestApplication } from '@nestjs/common';

describe('ProductService', () => {
  let service: UserService;
  let userRepository;
  let app: INestApplication;

  const mockProductRepository = () => ({
    createProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, ConfigModule],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockProductRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    return expect(service).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
