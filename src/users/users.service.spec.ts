import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserModelAction } from './user.model-action';

const mockUserModelAction = {};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserModelAction,
          useValue: mockUserModelAction,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
