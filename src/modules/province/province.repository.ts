import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProvinceEntity } from './entities/province.entity';
import { CreateProvinceDto } from './dto/create.province.dto';
import { ECommon } from 'src/common/enums/common.enum';
import { UpdateProvinceDto } from './dto/update.province.dto';

@Injectable()
export class ProvinceRepository extends Repository<ProvinceEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProvinceEntity, dataSource.createEntityManager());
  }

  async createNew(dto: CreateProvinceDto) {
    const findExistByName = await this.findBy({ name: dto.name });
    if (findExistByName?.length > 0) {
      return ECommon.EXIST;
    }
    const newProvince = this.create(dto);
    return await this.save(newProvince);
  }

  async findAll(): Promise<ProvinceEntity[]> {
    return this.find({ order: { createdAt: 'ASC' } });
  }

  async findById(id: string) {
    const result = await this.findOne({ where: { id } });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async updateById(infoUpdate: UpdateProvinceDto, id: string) {
    const province = await this.findOne({ where: { id } });
    if (!province) return false;

    try {
      await this.save({ ...province, ...infoUpdate });
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateSuggess(id: string) {
    const province = await this.findOne({ where: { id } });
    if (!province) {
      return false;
    }

    province.isSuggess = province?.isSuggess ? false : true;
    this.save(province);
    return true;
  }
}
