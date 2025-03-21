import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { ProvinceEntity } from './entities/province.entity';
import { ProvinceRepository } from './province.repository';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceEntity])],
  providers: [ProvinceRepository, ProvinceService, JwtService, MyService],
  controllers: [ProvinceController],
  exports: [ProvinceService, ProvinceRepository],
})
export class ProvinceModule {}
