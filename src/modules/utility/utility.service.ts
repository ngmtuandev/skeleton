import { Injectable } from '@nestjs/common';
import { UtilityRepository } from './utility.repository';

@Injectable()
export class UtilityService {
  constructor(private readonly utilityRepository: UtilityRepository) {}
}
