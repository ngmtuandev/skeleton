import { Injectable, NotFoundException } from '@nestjs/common';
import { ECommon } from 'src/common/enums/common.enum';
import { plainToClass } from 'class-transformer';
import { RequestWithPaginationDto } from 'src/common/dto/request.with.pagination.dto';
import paginationCustom from 'src/helper/paginate';
import { DistrictRepository } from './district.repository';
import { CreateDistrictDto } from './dto/create.district.dto';
import { DistrictDto } from './dto/district.dto';
import { ProvinceRepository } from '../province/province.repository';

@Injectable()
export class DistrictService {
  constructor(
    private readonly districtRepository: DistrictRepository,
    private readonly provinceRepository: ProvinceRepository,
  ) {}

  async create(dto: CreateDistrictDto) {
    const findExist = await this.provinceRepository.findById(dto.provinceId);

    if (!findExist) {
      return ECommon.NOT_EXIST;
    }

    const result = await this.districtRepository.createNew({
      ...dto,
    });
    if (result == ECommon.EXIST) {
      return ECommon.EXIST;
    } else {
      const resultConvertDto = plainToClass(DistrictDto, result);
      return resultConvertDto;
    }
  }

  async findAll(request: RequestWithPaginationDto) {
    const result = await paginationCustom({
      repository: this.districtRepository,
      page: request?.page ? +request?.page : 1,
      size: request?.size ? +request?.size : 10,
      dto: DistrictDto,
      search: request.search,
      searchFields: ['name'],
    });

    return result;
  }

  async delete(id: string) {
    const result = await this.districtRepository.delete(id);
    if (result?.affected) {
      return true;
    } else {
      return false;
    }
  }
}
