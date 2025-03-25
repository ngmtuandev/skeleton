import { BaseEntity } from 'src/common/entities/base.entity';
import { EAreaArround } from 'src/common/enums/area.arround.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'area_arround' })
export class AreaArroundEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: EAreaArround,
    nullable: false,
  })
  type: EAreaArround;
}
