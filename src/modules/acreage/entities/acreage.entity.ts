import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'acreage' })
export class AcreageEntity extends BaseEntity {
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  value: number;
}
