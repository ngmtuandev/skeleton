import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import {
  AccountModule,
  AcreageModule,
  AreaArroundModule,
  AuthModule,
  DistrictModule,
  EnviromentArroundModule,
  ImagePropertyModule,
  ProvinceModule,
  TypePropertyModule,
  UploadModule,
  UtilityModule,
} from './modules/module';
import { APP_FILTER } from '@nestjs/core';
import { CustomHttpExceptionFilter } from './filters/custom-http-exception.filter';

@Module({
  imports: [
    // config use env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // config database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '203.145.47.225',
      port: 3306,
      username: 'tuandb',
      password: 'tuandb',
      database: 'tuandb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.register(),
    AccountModule,
    AuthModule,
    UploadModule,
    TypePropertyModule,
    AcreageModule,
    ProvinceModule,
    ImagePropertyModule,
    EnviromentArroundModule,
    AreaArroundModule,
    UtilityModule,
    DistrictModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
