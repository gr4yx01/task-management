import { Module } from '@nestjs/common';
import { UserWorkspacesService } from './user_workspaces.service';
import { UserWorkspacesController } from './user_workspaces.controller';

@Module({
  controllers: [UserWorkspacesController],
  providers: [UserWorkspacesService],
})
export class UserWorkspacesModule {}
