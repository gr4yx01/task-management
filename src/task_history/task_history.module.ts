import { Module } from '@nestjs/common';
import { TaskHistoryService } from './task_history.service';
import { TaskHistoryController } from './task_history.controller';

@Module({
  controllers: [TaskHistoryController],
  providers: [TaskHistoryService],
})
export class TaskHistoryModule {}
