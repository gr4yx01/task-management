import { BaseModelEntity } from "src/common/base-model.entity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class User extends BaseModelEntity {
    @Column()
    email: string

    @Column()
    hashedPassword: string

    @Column()
    name: string
}