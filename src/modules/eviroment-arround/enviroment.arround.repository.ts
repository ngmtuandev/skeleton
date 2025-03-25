import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnviromentArroundEntity } from './entities/enviroment.arround.entity';

@Injectable()
export class EnviromentArroundRepository {
  constructor(
    @InjectRepository(EnviromentArroundEntity)
    private readonly enviromentArroundRepository: Repository<EnviromentArroundEntity>,
  ) {}
}
