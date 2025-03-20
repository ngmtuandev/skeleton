import { Exclude, Expose } from 'class-transformer';
import { ETypeAccountEnum } from 'src/common/enums/type.account.enum';

export class AccountDto {
  @Expose()
  id: string;

  @Expose()
  userName: string;

  @Expose()
  type: ETypeAccountEnum;

  @Expose()
  roleId: string;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;

  @Exclude()
  password: string;
}
