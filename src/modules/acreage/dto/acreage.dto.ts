import { Expose } from 'class-transformer';

export class AcreageDto {
  @Expose()
  description: string;

  @Expose()
  value: number;
}
