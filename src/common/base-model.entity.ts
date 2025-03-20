import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseModelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
}