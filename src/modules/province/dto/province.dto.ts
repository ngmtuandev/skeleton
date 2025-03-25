import { Expose } from 'class-transformer';

export class ProvinceDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  imageUrl: number;

  @Expose()
  isSuggess: boolean;
}
