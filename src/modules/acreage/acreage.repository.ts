import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AcreageEntity } from './entities/acreage.entity';
import { CreateAcreageDto } from './dto/create.acreage.dto';
import { ECommon } from 'src/common/enums/common.enum';

@Injectable()
export class AcreageRepository {
  constructor(
    @InjectRepository(AcreageEntity)
    private readonly acreageRepository: Repository<AcreageEntity>,
  ) {}

  async create(dto: CreateAcreageDto) {
    const findExistByValue = await this.acreageRepository.findBy({
      value: dto.value,
    });
    if (findExistByValue?.length > 0) {
      return ECommon.EXIST;
    }
    const newAcreage = this.acreageRepository.create(dto);
    return await this.acreageRepository.save(newAcreage);
  }

  async findAll(): Promise<AcreageEntity[]> {
    return this.acreageRepository.find();
  }
}
