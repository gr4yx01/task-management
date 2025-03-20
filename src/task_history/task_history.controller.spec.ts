import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoryController } from './task_history.controller';
import { TaskHistoryService } from './task_history.service';

describe('TaskHistoryController', () => {
  let controller: TaskHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskHistoryController],
      providers: [TaskHistoryService],
    }).compile();

    controller = module.get<TaskHistoryController>(TaskHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
