import { Injectable, NotFoundException } from '@nestjs/common';
import { ImagePropertyRepository } from './image.property.repository';

@Injectable()
export class ImagePropertyService {
  constructor(
    private readonly imagePropertyRepository: ImagePropertyRepository,
  ) {}
}
