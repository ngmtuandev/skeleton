import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RequestWithPaginationDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  size: number;

  @ApiPropertyOptional()
  @IsOptional()
  search: string;
}
