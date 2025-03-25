import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ECommon } from 'src/common/enums/common.enum';
import { AreaArroundEntity } from '../entity';
import { CreateAreaArroundDto } from './dto/create.area.arround.dto';
import { UpdateAreaArroundDto } from './dto/update.area.arround.dto';

@Injectable()
export class AreaArroundRepository extends Repository<AreaArroundEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AreaArroundEntity, dataSource.createEntityManager());
  }

  async createNew(dto: CreateAreaArroundDto) {
    const findExistByName = await this.findBy({ name: dto.name });
    if (findExistByName?.length > 0) {
      return ECommon.EXIST;
    }
    const newDistrict = this.create(dto);
    return await this.save(newDistrict);
  }

  async findAll(): Promise<AreaArroundEntity[]> {
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

  async updateById(infoUpdate: UpdateAreaArroundDto, id: string) {
    const province = await this.findOne({ where: { id } });
    if (!province) return false;

    try {
      await this.save({ ...infoUpdate, id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
