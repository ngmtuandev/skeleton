import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { DistrictRepository } from './district.repository';
import { DistrictService } from './district.service';
import { DistrictEntity } from './entities/district.entity';
import { DistrictController } from './district.controller';
import { ProvinceRepository } from '../province/province.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity])],
  providers: [
    DistrictRepository,
    DistrictService,
    JwtService,
    MyService,
    ProvinceRepository,
  ],
  controllers: [DistrictController],
  exports: [DistrictRepository, DistrictService],
})
export class DistrictModule {}
