import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';
import { TypePropertyEntity } from './entities/type.property.entity';
import { TypePropertyRepository } from './type.property.repository';
import { TypePropertyService } from './type.property.service';
import { TypePropertyController } from './type.property.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypePropertyEntity])],
  providers: [
    TypePropertyRepository,
    TypePropertyService,
    JwtService,
    MyService,
  ],
  controllers: [TypePropertyController],
  exports: [TypePropertyService, TypePropertyRepository],
})
export class TypePropertyModule {}
