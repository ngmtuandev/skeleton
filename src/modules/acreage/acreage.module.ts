import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { AcreageEntity } from './entities/acreage.entity';
import { AcreageRepository } from './acreage.repository';
import { AcreageService } from './acreage.service';
import { AcreageController } from './acreage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AcreageEntity])],
  providers: [AcreageService, AcreageRepository, JwtService, MyService],
  controllers: [AcreageController],
  exports: [AcreageService, AcreageRepository],
})
export class AcreageModule {}
