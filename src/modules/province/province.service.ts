import { Injectable, NotFoundException } from '@nestjs/common';
import { ProvinceRepository } from './province.repository';
import { CreateProvinceDto } from './dto/create.province.dto';
import { ECommon } from 'src/common/enums/common.enum';
import { plainToClass } from 'class-transformer';
import { ProvinceDto } from './dto/province.dto';
import { UpdateProvinceDto } from './dto/update.province.dto';
import { RequestWithPaginationDto } from 'src/common/dto/request.with.pagination.dto';
import paginationCustom from 'src/helper/paginate';

@Injectable()
export class ProvinceService {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async create(dto: CreateProvinceDto) {
    const result = await this.provinceRepository.createNew({
      ...dto,
      isSuggess: dto.isSuggess ? dto.isSuggess : false,
    });
    if (result == ECommon.EXIST) {
      return ECommon.EXIST;
    } else {
      const resultConvertDto = plainToClass(ProvinceDto, result);
      return resultConvertDto;
    }
  }

  async findAll(request: RequestWithPaginationDto) {
    const result = await paginationCustom({
      repository: this.provinceRepository,
      page: request?.page ? +request?.page : 1,
      size: request?.size ? +request?.size : 10,
      dto: ProvinceDto,
      search: request.search,
      searchFields: ['name'],
    });

    return result;
  }

  async update(infoUpdate: UpdateProvinceDto, id: string) {
    const result = await this.provinceRepository.updateById(infoUpdate, id);
    return result;
  }

  async delete(id: string) {
    const result = await this.provinceRepository.delete(id);
    if (result?.affected) {
      return true;
    } else {
      return false;
    }
  }

  async updateSuggess(id: string) {
    const result = await this.provinceRepository.updateSuggess(id);
    return result;
  }
}
