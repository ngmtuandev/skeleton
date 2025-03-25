import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaArroundRepository } from './area.arround.repository';
import { CreateAreaArroundDto } from './dto/create.area.arround.dto';
import { ECommon } from 'src/common/enums/common.enum';
import { plainToClass } from 'class-transformer';
import { AreaArroundDto } from './dto/area.arround.dto';
import { UpdateAreaArroundDto } from './dto/update.area.arround.dto';

@Injectable()
export class AreaArroundService {
  constructor(private readonly areaArroundRepository: AreaArroundRepository) {}

  async create(dto: CreateAreaArroundDto) {
    const result = await this.areaArroundRepository.createNew({
      ...dto,
    });
    if (result == ECommon.EXIST) {
      return ECommon.EXIST;
    } else {
      const resultConvertDto = plainToClass(AreaArroundDto, result);
      return resultConvertDto;
    }
  }

  async findAll() {
    const result = await this.areaArroundRepository.findAll();

    return result;
  }

  async update(infoUpdate: UpdateAreaArroundDto, id: string) {
    const result = await this.areaArroundRepository.updateById(infoUpdate, id);
    return result;
  }

  async delete(id: string) {
    const result = await this.areaArroundRepository.delete(id);
    if (result?.affected) {
      return true;
    } else {
      return false;
    }
  }
}
