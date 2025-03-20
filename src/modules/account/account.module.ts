import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountService, AccountRepository, JwtService, MyService],
  controllers: [AccountController],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
