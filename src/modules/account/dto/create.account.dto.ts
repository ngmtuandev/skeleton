import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ETypeAccountEnum } from 'src/common/enums/type.account.enum';

export class CreateAccountDto {
  @ApiProperty({ example: 'Nguyễn Mạnh Tuấn', description: 'Tên đăng nhập' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'tuan@gmail.com', description: 'Tên đăng nhập' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUUID()
  roleId: string;

  @ApiProperty({
    example: 'xã - quận(huyện) - tỉnh',
    description: 'Địa chỉ người thuê',
  })
  @ApiProperty()
  @IsEmail()
  address: string;

  @ApiProperty({
    example: '0363073476',
    description: 'Số điện thoại người thuê',
  })
  @ApiProperty()
  @IsEmail()
  phoneNumber: string;

  @ApiProperty({
    example: 'Người đi làm',
    description: 'WORKER, STUDENT, COUPLE or FAMILY',
  })
  @ApiProperty()
  @IsEnum(ETypeAccountEnum, {
    message: 'Type must be WORKER, STUDENT, COUPLE or FAMILY',
  })
  type: ETypeAccountEnum;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
