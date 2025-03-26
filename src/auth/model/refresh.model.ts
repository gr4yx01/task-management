import { BaseModelEntity } from 'src/common/base-model.entity';
import { User } from 'src/users/model/user.model';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Refresh extends BaseModelEntity {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ nullable: false })
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: false })
  expiry_time: Date;
}
