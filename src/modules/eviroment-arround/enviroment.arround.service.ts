import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EnviromentArroundRepository } from './enviroment.arround.repository';

@Injectable()
export class EnviromentArroundService {
  constructor(
    private readonly enviromentArroundRepository: EnviromentArroundRepository,
  ) {}
}
