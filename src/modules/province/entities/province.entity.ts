import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'province' })
export class ProvinceEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: false })
  isSuggess: boolean;

  @Column({ nullable: false })
  imageUrl: string;
}
