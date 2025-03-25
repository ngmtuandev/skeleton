import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagePropertyEntity } from './entities/image.property.entity';

@Injectable()
export class ImagePropertyRepository {
  constructor(
    @InjectRepository(ImagePropertyEntity)
    private readonly imagePropertyRepository: Repository<ImagePropertyEntity>,
  ) {}
}
