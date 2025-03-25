import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { UtilityEntity } from './entities/utility.entity';
import { UtilityService } from './utility.service';
import { UtilityRepository } from './utility.repository';
import { UtilityController } from './utility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UtilityEntity])],
  providers: [UtilityRepository, UtilityService, JwtService, MyService],
  controllers: [UtilityController],
  exports: [UtilityService, UtilityRepository],
})
export class UtilityModule {}
