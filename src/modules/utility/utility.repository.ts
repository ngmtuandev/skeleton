import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilityEntity } from './entities/utility.entity';

@Injectable()
export class UtilityRepository {
  constructor(
    @InjectRepository(UtilityEntity)
    private readonly utilityRepository: Repository<UtilityEntity>,
  ) {}
}
