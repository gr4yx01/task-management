import { Controller } from '@nestjs/common';
import { UserInvitationsService } from './user_invitations.service';

@Controller('user-invitations')
export class UserInvitationsController {
  constructor(private readonly userInvitationsService: UserInvitationsService) {}
}
