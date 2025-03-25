import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'utility' })
export class UtilityEntity extends BaseEntity {
  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  name: string;
}
