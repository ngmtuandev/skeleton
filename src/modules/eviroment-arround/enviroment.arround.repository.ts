import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnviromentArroundEntity } from './entities/enviroment.arround.entity';
import { CreateEnviromentArroundDto } from './dto/create.enviroment.arround';
import { ECommon } from 'src/common/enums/common.enum';
import { UpdateEnviromentArroundDto } from './dto/update.enviroment.arround';

@Injectable()
export class EnviromentArroundRepository extends Repository<EnviromentArroundEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EnviromentArroundEntity, dataSource.createEntityManager());
  }

  async createNew(dto: CreateEnviromentArroundDto) {
    const findExistByName = await this.findBy({ name: dto.name });
    if (findExistByName?.length > 0) {
      return ECommon.EXIST;
    }
    const newProvince = this.create(dto);
    return await this.save(newProvince);
  }

  async findAll(): Promise<EnviromentArroundEntity[]> {
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

  async updateById(infoUpdate: UpdateEnviromentArroundDto, id: string) {
    const province = await this.findOne({ where: { id } });
    if (!province) return false;

    try {
      await this.save({ ...province, ...infoUpdate });
      return true;
    } catch (error) {
      return false;
    }
  }
}
