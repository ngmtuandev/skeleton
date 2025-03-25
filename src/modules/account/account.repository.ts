import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { CreateAccountDto } from './dto/create.account.dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(dto: CreateAccountDto): Promise<AccountEntity> {
    const newUser = this.accountRepository.create(dto);
    return await this.accountRepository.save(newUser);
  }

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    return this.accountRepository.findOne({ where: { email } });
  }

  async findByIdOrEmailOrPhone(
    identifier: string,
  ): Promise<AccountEntity | null> {
    return this.accountRepository.findOne({
      where: [{ email: identifier }, { phoneNumber: identifier }],
    });
  }
}
