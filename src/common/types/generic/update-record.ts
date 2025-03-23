import { EntityManager } from 'typeorm';

type UpdateRecordGeneric<UpdateRecordPayload, IdentifierOptions> = {
  identifierOptions: IdentifierOptions;
  updatePayload: UpdateRecordPayload;
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
};

export default UpdateRecordGeneric
