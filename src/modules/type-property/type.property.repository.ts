import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypePropertyEntity } from './entities/type.property.entity';
import { CreateTypePropertyDto } from './dto/create.type.property.dto';
import { ECommon } from 'src/common/enums/common.enum';
import { UpdateTypePropertyDto } from './dto/update.type.property.dto';

@Injectable()
export class TypePropertyRepository {
  constructor(
    @InjectRepository(TypePropertyEntity)
    private readonly typePropertyRepository: Repository<TypePropertyEntity>,
  ) {}

  async create(dto: CreateTypePropertyDto) {
    const findExistByType = await this.typePropertyRepository.findBy({
      type: dto.type,
    });
    if (findExistByType?.length > 0) {
      return ECommon.EXIST;
    }
    const newTypeProperty = this.typePropertyRepository.create(dto);
    return await this.typePropertyRepository.save(newTypeProperty);
  }

  async findAll(): Promise<TypePropertyEntity[]> {
    return this.typePropertyRepository.find();
  }

  async findById(id: string) {
    const result = await this.typePropertyRepository.findBy({ id });
    if (result) return result;
    else return false;
  }

  async update(infoUpdate: UpdateTypePropertyDto, id: string) {
    const type = this.findById(id);

    if (!type) return false;
    try {
      this.typePropertyRepository.save({ ...infoUpdate, id });
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.typePropertyRepository.delete({ id });
      if (result?.affected) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
