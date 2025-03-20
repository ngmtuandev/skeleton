import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '../account/account.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MyService } from 'src/config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountService } from '../account/account.service';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService, AccountService, MyService],
  controllers: [AuthController],
})
export class AuthModule {}
