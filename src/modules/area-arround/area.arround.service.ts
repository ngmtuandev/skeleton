import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaArroundRepository } from './area.arround.repository';

@Injectable()
export class AreaArroundService {
  constructor(private readonly areaArroundRepository: AreaArroundRepository) {}
}
