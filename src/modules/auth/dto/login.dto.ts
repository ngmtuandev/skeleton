import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '0363073476',
    description: 'Phone number of account',
  })
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'string',
  })
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
