import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'enviroment_arround' })
export class EnviromentArroundEntity extends BaseEntity {
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  imageUrl: string;
}
