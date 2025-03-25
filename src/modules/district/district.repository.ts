import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ECommon } from 'src/common/enums/common.enum';
import { DistrictEntity } from './entities/district.entity';
import { CreateDistrictDto } from './dto/create.district.dto';

@Injectable()
export class DistrictRepository extends Repository<DistrictEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DistrictEntity, dataSource.createEntityManager());
  }

  async createNew(dto: CreateDistrictDto) {
    const findExistByName = await this.findBy({ name: dto.name });
    if (findExistByName?.length > 0) {
      return ECommon.EXIST;
    }
    const newProvince = this.create(dto);
    return await this.save(newProvince);
  }

  async findAll(): Promise<DistrictEntity[]> {
    return this.find({ order: { createdAt: 'ASC' } });
  }

  async findById(id: string) {
    const result = await this.findOne({ where: { id } });
    return result || false;
  }
}
