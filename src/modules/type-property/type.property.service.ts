import { Injectable } from '@nestjs/common';
import { TypePropertyRepository } from './type.property.repository';
import { CreateTypePropertyDto } from './dto/create.type.property.dto';
import { plainToClass } from 'class-transformer';
import { TypePropertyDto } from './dto/type.property.dto';
import { ECommon } from 'src/common/enums/common.enum';
import { UpdateTypePropertyDto } from './dto/update.type.property.dto';

@Injectable()
export class TypePropertyService {
  constructor(
    private readonly typePropertyRepository: TypePropertyRepository,
  ) {}

  async create(dto: CreateTypePropertyDto) {
    const result = await this.typePropertyRepository.create(dto);
    if (result == ECommon.EXIST) {
      return ECommon.EXIST;
    } else {
      const resultConvertDto = plainToClass(TypePropertyDto, result);
      return resultConvertDto;
    }
  }

  async findAll() {
    const results = this.typePropertyRepository.findAll();
    const resultConvertDto = plainToClass(TypePropertyDto, results);
    return resultConvertDto;
  }

  async update(infoUpdate: UpdateTypePropertyDto, id: string) {
    const result = await this.typePropertyRepository.update(infoUpdate, id);
    return result;
  }

  async delete(id: string) {
    const result = await this.typePropertyRepository.delete(id);
    return result;
  }
}
