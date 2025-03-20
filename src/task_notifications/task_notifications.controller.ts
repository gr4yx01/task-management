import { Controller } from '@nestjs/common';
import { TaskNotificationsService } from './task_notifications.service';

@Controller('task-notifications')
export class TaskNotificationsController {
  constructor(private readonly taskNotificationsService: TaskNotificationsService) {}
}
