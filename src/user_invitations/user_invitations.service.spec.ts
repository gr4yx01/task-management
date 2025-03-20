import { Test, TestingModule } from '@nestjs/testing';
import { UserInvitationsService } from './user_invitations.service';

describe('UserInvitationsService', () => {
  let service: UserInvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInvitationsService],
    }).compile();

    service = module.get<UserInvitationsService>(UserInvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
