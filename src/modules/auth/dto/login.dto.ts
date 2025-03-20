import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '0363073477',
    description: 'Phone number of account',
  })
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '111111',
  })
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
