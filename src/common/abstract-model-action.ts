import {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import CreateRecordGeneric from './types/generic/create-record';
import UpdateRecordGeneric from './types/generic/update-record';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import UpsertRecordGeneric from './types/generic/upsert-record';

export abstract class BaseEntityActionModel<T extends ObjectLiteral> {
  model: EntityTarget<T>;

  constructor(
    protected readonly repository: Repository<T>,
    model: EntityTarget<T>,
  ) {
    this.model = model;
  }

  async create(
    createRecordGeneric: CreateRecordGeneric<DeepPartial<T>>,
  ): Promise<T | null> {
    const { createPayload, transactionOptions } = createRecordGeneric;

    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;

    const response: T | null = (await modelRepository.save(
      createPayload,
    )) as T | null;

    return response;
  }

  async get(
    getRecordIdentifierOptions: object,
    queryOptions?: object,
    relations?: object,
    select?: object,
  ) {
    return await this.repository.findOne({
      where: getRecordIdentifierOptions,
      ...queryOptions,
      relations,
      select,
    });
  }

  async update(
    updateRecordGeneric: UpdateRecordGeneric<
      QueryDeepPartialEntity<T>,
      FindOptionsWhere<T>
    >,
  ): Promise<T | null> {
    const { updatePayload, identifierOptions, transactionOptions } =
      updateRecordGeneric;

    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;

    await modelRepository.update(identifierOptions, updatePayload);
    return await modelRepository.findOne({ where: identifierOptions });
  }

  async upsert(
    upsertRecordGeneric: UpsertRecordGeneric<
      QueryDeepPartialEntity<T>,
      FindOptionsWhere<T>
    >,
  ): Promise<T | null> {
    const { upsertPayload, identifierOptions, transactionOptions } =
      upsertRecordGeneric;

    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;

    const recordExist = await modelRepository.findOne({
      where: identifierOptions,
    });

    if (recordExist) {
      await modelRepository.update(identifierOptions, upsertPayload);
      return await modelRepository.findOne({ where: identifierOptions });
    } else {
      return await modelRepository.save(upsertPayload as DeepPartial<T>);
    }
  }
}
