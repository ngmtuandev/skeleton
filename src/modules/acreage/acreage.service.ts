import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AcreageRepository } from './acreage.repository';
import { CreateAcreageDto } from './dto/create.acreage.dto';
import { ECommon } from 'src/common/enums/common.enum';
import { plainToClass } from 'class-transformer';
import { AcreageDto } from './dto/acreage.dto';

@Injectable()
export class AcreageService {
  constructor(private readonly acreageRepository: AcreageRepository) {}

  async create(dto: CreateAcreageDto) {
    const result = await this.acreageRepository.create(dto);
    if (result == ECommon.EXIST) {
      return ECommon.EXIST;
    } else {
      const resultConvertDto = plainToClass(AcreageDto, result, {
        excludeExtraneousValues: true,
      });
      return resultConvertDto;
    }
  }

  async findAll() {
    const results = await this.acreageRepository.findAll();
    const resultConvertDto = plainToClass(AcreageDto, results, {
      excludeExtraneousValues: true,
    });
    return resultConvertDto;
  }
}
