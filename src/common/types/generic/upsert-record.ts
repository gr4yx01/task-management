import { EntityManager } from 'typeorm';

type UpsertRecordGeneric<UpsertPayload, IdentifierOptions> = {
  identifierOptions: IdentifierOptions;
  upsertPayload: UpsertPayload;
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
};


export default UpsertRecordGeneric