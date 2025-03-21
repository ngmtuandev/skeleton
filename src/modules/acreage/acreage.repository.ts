import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AcreageEntity } from './entities/acreage.entity';

@Injectable()
export class AcreageRepository {
  constructor(
    @InjectRepository(AcreageEntity)
    private readonly acreageRepository: Repository<AcreageEntity>,
  ) {}
}
