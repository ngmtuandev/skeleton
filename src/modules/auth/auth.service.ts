import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AccountService } from '../account/account.service';
import { ConfigService } from '@nestjs/config';
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private accoutService: AccountService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<AccountEntity> {
    const user =
      await this.accoutService.getUserByIdOrEmailOrPhoneNumber(identifier);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Thông tin xác thực không hợp lệ');
  }

  async login(user: AccountEntity) {
    const payload = {
      username: user.userName,
      role: user.roleId,
      type: user.type,
      phoneNumber: user.phoneNumber,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });

    return {
      accessToken: token,
    };
  }
}
