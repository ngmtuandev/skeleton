import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import {
  AccountModule,
  AcreageModule,
  AuthModule,
  ProvinceModule,
  TypePropertyModule,
  UploadModule,
} from './modules/module';

@Module({
  imports: [
    // config use env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Đọc từ file .env
    }),

    // config database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Manhtuan123***',
      database: 'postgres',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
