import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateProvinceDto } from './dto/create.province.dto';
import { ProvinceService } from './province.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guards';
import { ERole } from 'src/common/enums/role.enum';
import { ECommon } from 'src/common/enums/common.enum';
import { RequestWithPaginationDto } from 'src/common/dto/request.with.pagination.dto';

@ApiTags('province')
@UseFilters(HttpExceptionFilter)
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateProvinceDto): Promise<ResponseDto<any>> {
    const result = await this.provinceService.create(dto);
    if (result === ECommon.EXIST) {
      return new ResponseDto(400, 'Tỉnh này đã tồn tại');
    } else if (result) {
      return new ResponseDto(201, 'Tạo mới Thành công', result);
    } else {
      return new ResponseDto(400, 'Tạo tỉnh mới thất bại');
    }
  }

  @Get()
  async findAll(@Query() request: RequestWithPaginationDto) {
    const result = await this.provinceService.findAll(request);
    if (result) {
      return new ResponseDto(200, 'Lấy danh sách tỉnh sản thành công', result);
    } else {
      return new ResponseDto(400, 'Lấy danh sách tỉnh sản thất bại');
    }
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @Put('suggess')
  async updateSuggess(@Query('id') id: string): Promise<ResponseDto<any>> {
    const result = await this.provinceService.updateSuggess(id);
    if (result) {
      return new ResponseDto(200, 'Cập nhập đề xuất tỉnh thành công');
    } else {
      return new ResponseDto(400, 'Cập nhập đề xuất tỉnh thất bại');
    }
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<any>> {
    const result = await this.provinceService.delete(id);
    if (result) {
      return new ResponseDto(200, 'Xóa tỉnh thành công');
    } else {
      return new ResponseDto(400, 'Xóa tỉnh thất bại');
    }
  }
}
