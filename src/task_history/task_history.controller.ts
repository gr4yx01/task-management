import { Controller } from '@nestjs/common';
import { TaskHistoryService } from './task_history.service';

@Controller('task-history')
export class TaskHistoryController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}
}
