import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkspacesController } from './user_workspaces.controller';
import { UserWorkspacesService } from './user_workspaces.service';

describe('UserWorkspacesController', () => {
  let controller: UserWorkspacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWorkspacesController],
      providers: [UserWorkspacesService],
    }).compile();

    controller = module.get<UserWorkspacesController>(UserWorkspacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
