import { Module } from '@nestjs/common';
import { UserInvitationsService } from './user_invitations.service';
import { UserInvitationsController } from './user_invitations.controller';

@Module({
  controllers: [UserInvitationsController],
  providers: [UserInvitationsService],
})
export class UserInvitationsModule {}
