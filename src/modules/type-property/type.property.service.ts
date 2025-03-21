import { Injectable } from '@nestjs/common';
import { TypePropertyRepository } from './type.property.repository';

@Injectable()
export class TypePropertyService {
  constructor(
    private readonly typePropertyRepository: TypePropertyRepository,
  ) {}
}
