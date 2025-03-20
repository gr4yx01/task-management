import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoryService } from './task_history.service';

describe('TaskHistoryService', () => {
  let service: TaskHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskHistoryService],
    }).compile();

    service = module.get<TaskHistoryService>(TaskHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
