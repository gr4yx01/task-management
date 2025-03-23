import { BaseEntityActionModel } from 'src/common/abstract-model-action';
import { Refresh } from './model/refresh.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class RefreshModelAction extends BaseEntityActionModel<Refresh> {
  constructor(
    @InjectRepository(Refresh) refreshRepository: Repository<Refresh>,
  ) {
    super(refreshRepository, Refresh);
  }
}
