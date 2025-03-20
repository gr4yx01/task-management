import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkspacesService } from './user_workspaces.service';

describe('UserWorkspacesService', () => {
  let service: UserWorkspacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWorkspacesService],
    }).compile();

    service = module.get<UserWorkspacesService>(UserWorkspacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
