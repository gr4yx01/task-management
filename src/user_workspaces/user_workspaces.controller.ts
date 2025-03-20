import { Controller } from '@nestjs/common';
import { UserWorkspacesService } from './user_workspaces.service';

@Controller('user-workspaces')
export class UserWorkspacesController {
  constructor(private readonly userWorkspacesService: UserWorkspacesService) {}
}
