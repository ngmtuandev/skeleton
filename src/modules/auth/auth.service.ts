import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private accoutService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user =
      await this.accoutService.getUserByIdOrEmailOrPhoneNumber(identifier);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Thông tin xác thực không hợp lệ');
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
