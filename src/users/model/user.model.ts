import { BaseModelEntity } from '@/common/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseModelEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  name: string;
}
