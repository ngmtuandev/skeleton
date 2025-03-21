import { Expose } from 'class-transformer';

export class ProvinceDto {
  @Expose()
  name: string;

  @Expose()
  imageUrl: number;

  @Expose()
  isSuggess: boolean;
}
