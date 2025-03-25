import { Expose } from 'class-transformer';

export class DistrictDto {
  @Expose()
  name: string;

  @Expose()
  provinceId: string;
}
