import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ETypeProperty } from 'src/common/enums/type.property.enum';

export class UpdateTypePropertyDto {
  @ApiProperty({ example: 'Mô tả về loại' })
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty({
    example: 'Phòng trọ',
    description: 'MOTEL, HOUSE, APARTMENT',
  })
  @ApiProperty()
  @IsEnum(ETypeProperty, {
    message: 'Type must be MOTEL, HOUSE, APARTMENT',
  })
  type: ETypeProperty;
}
