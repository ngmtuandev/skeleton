import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EAreaArround } from 'src/common/enums/area.arround.enum';

export class UpdateAreaArroundDto {
  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'SCHOOL',
    description: 'SCHOOL OR MARKET',
  })
  @ApiProperty()
  @IsEnum(EAreaArround, {
    message: 'Type must be SCHOOL, MARKET',
  })
  type: EAreaArround;
}
