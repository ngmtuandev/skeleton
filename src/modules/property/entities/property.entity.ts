import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'property' })
export class PropertyEntity extends BaseEntity {
  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  description: string;
}
