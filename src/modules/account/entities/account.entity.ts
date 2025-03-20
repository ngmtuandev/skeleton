import { BaseEntity } from 'src/common/entities/base.entity';
import { ETypeAccountEnum } from 'src/common/enums/type.account.enum';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @Column({ unique: false, nullable: false })
  userName: string;

  @Column({
    type: 'enum',
    enum: ETypeAccountEnum,
    default: ETypeAccountEnum.STUDENT,
  })
  type: ETypeAccountEnum;

  @Column({ nullable: false })
  roleId: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false, unique: true })
  phoneNumber: string;

  @Column({ nullable: false, unique: true })
  email: string;
}
