import { Expose } from 'class-transformer';

export class AcreageDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  value: number;
}
