import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AccountEntity,
  AcreageEntity,
  ProvinceEntity,
  TypePropertyEntity,
} from 'src/modules/entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          AccountEntity,
          TypePropertyEntity,
          AcreageEntity,
          ProvinceEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
