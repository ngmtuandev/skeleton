import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create.account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './account.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AccountService {
  constructor(private readonly usersRepository: AccountRepository) {}

  async createUser(dto: CreateAccountDto): Promise<AccountEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
  }

  async getAllUsers(): Promise<AccountEntity[]> {
    return this.usersRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<AccountEntity> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException('Tài khoản này không tồn tại');
    return user;
  }

  async getUserByIdOrEmailOrPhoneNumber(
    identifier: string,
  ): Promise<AccountEntity | null> {
    const user = await this.usersRepository.findByIdOrEmailOrPhone(identifier);
    if (!user) throw new NotFoundException('Tài khoản này không tồn tại');
    return user;
  }
}
