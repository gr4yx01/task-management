import { DeepPartial, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import CreateRecordGeneric from "./types/generic/create-record";

export abstract class BaseEntityActionModel<T extends ObjectLiteral> {
    model: EntityTarget<T>

    constructor(
        protected readonly repository: Repository<T>, 
        model: EntityTarget<T>,
    ) {
        this.model = model
    }

    async create(createRecordGeneric: CreateRecordGeneric<DeepPartial<T>>): Promise<T | null> {
        const { createPayload, transactionOptions } = createRecordGeneric

        const modelRepository = transactionOptions.useTransaction ? transactionOptions.transaction.getRepository(this.model) : this.repository

        const response: T | null = (await modelRepository.save(createPayload)) as T | null

        return response
    }
}