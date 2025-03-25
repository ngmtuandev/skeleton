import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { AreaArroundEntity } from './entities/area.arround.entity';
import { AreaArroundRepository } from './area.arround.repository';
import { AreaArroundService } from './area.arround.service';
import { AreaArroundController } from './area.arround.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AreaArroundEntity])],
  providers: [AreaArroundService, AreaArroundRepository, JwtService, MyService],
  controllers: [AreaArroundController],
  exports: [AreaArroundService, AreaArroundRepository],
})
export class AreaArroundModule {}
