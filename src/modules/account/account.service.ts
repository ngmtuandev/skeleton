import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create.account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './account.repository';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { AccountDto } from './dto/account.dto';

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

  async getAllUsers(): Promise<AccountDto[]> {
    const result = await this.usersRepository.findAll();

    const resultConvertDto = plainToClass(AccountDto, result);
    return resultConvertDto;
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
