import { BaseEntityActionModel } from "@/common/abstract-model-action";
import { User } from "./model/user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class UserModelAction extends BaseEntityActionModel<User> {
    constructor(@InjectRepository(User) repository: Repository<User>) {
        super(repository, User)
    }
}
