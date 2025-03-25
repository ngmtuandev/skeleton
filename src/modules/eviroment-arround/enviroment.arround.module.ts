import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { EnviromentArroundService } from './enviroment.arround.service';
import { EnviromentArroundRepository } from './enviroment.arround.repository';
import { EnviromentArroundController } from './enviroment.arround.controller';
import { EnviromentArroundEntity } from './entities/enviroment.arround.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnviromentArroundEntity])],
  providers: [
    EnviromentArroundService,
    EnviromentArroundRepository,
    JwtService,
    MyService,
  ],
  controllers: [EnviromentArroundController],
  exports: [EnviromentArroundService, EnviromentArroundRepository],
})
export class EnviromentArroundModule {}
