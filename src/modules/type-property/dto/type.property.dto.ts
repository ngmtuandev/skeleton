import { Expose } from 'class-transformer';
import { ETypeProperty } from 'src/common/enums/type.property.enum';

export class TypePropertyDto {
  @Expose()
  description: string;

  @Expose()
  imageUrl: string;

  @Expose()
  type: ETypeProperty;
}
