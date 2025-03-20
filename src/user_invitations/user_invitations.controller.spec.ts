import { Test, TestingModule } from '@nestjs/testing';
import { UserInvitationsController } from './user_invitations.controller';
import { UserInvitationsService } from './user_invitations.service';

describe('UserInvitationsController', () => {
  let controller: UserInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInvitationsController],
      providers: [UserInvitationsService],
    }).compile();

    controller = module.get<UserInvitationsController>(UserInvitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
