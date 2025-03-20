import { Module } from '@nestjs/common';
import { TaskNotificationsService } from './task_notifications.service';
import { TaskNotificationsController } from './task_notifications.controller';

@Module({
  controllers: [TaskNotificationsController],
  providers: [TaskNotificationsService],
})
export class TaskNotificationsModule {}
