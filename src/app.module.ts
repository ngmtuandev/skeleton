import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AccountModule } from './modules/account/account.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
