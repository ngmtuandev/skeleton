import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AcreageRepository } from './acreage.repository';

@Injectable()
export class AcreageService {
  constructor(private readonly acreageRepository: AcreageRepository) {}
}
