import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { ImagePropertyEntity } from '../entity';
import { ImagePropertyRepository } from './image.property.repository';
import { ImagePropertyService } from './image.property.service';
import { ImagePropertyController } from './image.property.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImagePropertyEntity])],
  providers: [
    ImagePropertyService,
    ImagePropertyRepository,
    JwtService,
    MyService,
  ],
  controllers: [ImagePropertyController],
  exports: [ImagePropertyService, ImagePropertyRepository],
})
export class ImagePropertyModule {}
