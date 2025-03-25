import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { AcreageService } from './acreage.service';
import { CreateAcreageDto } from './dto/create.acreage.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guards';
import { ERole } from 'src/common/enums/role.enum';
import { ECommon } from 'src/common/enums/common.enum';

@ApiTags('acreage')
@UseFilters(HttpExceptionFilter)
@Controller('acreage')
export class AcreageController {
  constructor(private readonly acreageService: AcreageService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateAcreageDto): Promise<ResponseDto<any>> {
    const result = await this.acreageService.create(dto);

    if (result === ECommon.EXIST) {
      return new ResponseDto(400, 'Diện tích này đã tồn tại');
    } else if (result) {
      return new ResponseDto(201, 'Tạo mới diện tích sản thành công', result);
    } else {
      return new ResponseDto(400, 'Tạo mới diện tích sản thất bại');
    }
  }

  @Get()
  async findAll() {
    const result = await this.acreageService.findAll();
    if (result) {
      return new ResponseDto(
        200,
        'Lấy danh sách diện tích sản thành công',
        result,
      );
    } else {
      return new ResponseDto(400, 'Lấy danh sách diện tích sản thất bại');
    }
  }
}
