import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
