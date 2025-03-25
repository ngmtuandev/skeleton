import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EAreaArround } from 'src/common/enums/area.arround.enum';

export class AreaArroundDto {
  @Expose()
  imageUrl: string;

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: EAreaArround;
}
