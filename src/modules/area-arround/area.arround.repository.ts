import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaArroundEntity } from './entities/area.arround.entity';

@Injectable()
export class AreaArroundRepository {
  constructor(
    @InjectRepository(AreaArroundEntity)
    private readonly areaArroundRepository: Repository<AreaArroundEntity>,
  ) {}
}
