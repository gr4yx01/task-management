import { Test, TestingModule } from '@nestjs/testing';
import { TaskNotificationsController } from './task_notifications.controller';
import { TaskNotificationsService } from './task_notifications.service';

describe('TaskNotificationsController', () => {
  let controller: TaskNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskNotificationsController],
      providers: [TaskNotificationsService],
    }).compile();

    controller = module.get<TaskNotificationsController>(TaskNotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
