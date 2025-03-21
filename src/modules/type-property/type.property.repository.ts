import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypePropertyEntity } from './entities/type.property.entity';

@Injectable()
export class TypePropertyRepository {
  constructor(
    @InjectRepository(TypePropertyEntity)
    private readonly typePropertyRepository: Repository<TypePropertyEntity>,
  ) {}
}
