import { Test, TestingModule } from '@nestjs/testing';
import { TaskNotificationsService } from './task_notifications.service';

describe('TaskNotificationsService', () => {
  let service: TaskNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskNotificationsService],
    }).compile();

    service = module.get<TaskNotificationsService>(TaskNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
