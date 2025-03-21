import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create.account.dto';
import { AccountEntity } from './entities/account.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guards';
import { ERole } from 'src/common/enums/role.enum';

@ApiTags('account')
@UseFilters(HttpExceptionFilter)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() dto: CreateAccountDto): Promise<ResponseDto<any>> {
    const result = await this.accountService.createUser(dto);
    const { password, ...userWithoutPassword } = result;
    return new ResponseDto(
      201,
      'Tạo mới người dùng thành công',
      userWithoutPassword,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  async getAll(): Promise<ResponseDto<any>> {
    const results = await this.accountService.getAllUsers();
    return new ResponseDto(200, 'Lấy danh sách người dùng thành công', results);
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<AccountEntity> {
    return this.accountService.getUserByEmail(email);
  }
}
