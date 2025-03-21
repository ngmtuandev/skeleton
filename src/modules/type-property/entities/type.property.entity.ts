import { BaseEntity } from 'src/common/entities/base.entity';
import { ETypeProperty } from 'src/common/enums/type.property.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'type_property' })
export class TypePropertyEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ETypeProperty,
    default: ETypeProperty.MOTEL,
    nullable: true,
  })
  type: ETypeProperty;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  imageUrl: string;
}
