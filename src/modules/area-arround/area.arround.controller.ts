import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AreaArroundService } from './area.arround.service';
import { CreateAreaArroundDto } from './dto/create.area.arround.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guards';
import { ERole } from 'src/common/enums/role.enum';
import { ECommon } from 'src/common/enums/common.enum';
import { UpdateAreaArroundDto } from './dto/update.area.arround.dto';

@ApiTags('area-arround')
@UseFilters(HttpExceptionFilter)
@Controller('area-arround')
export class AreaArroundController {
  constructor(private readonly areaArroundService: AreaArroundService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateAreaArroundDto): Promise<ResponseDto<any>> {
    const result = await this.areaArroundService.create(dto);
    if (result === ECommon.EXIST) {
      return new ResponseDto(400, 'Khu vực này đã tồn tại');
    } else if (result) {
      return new ResponseDto(201, 'Tạo mới khu vực Thành công', result);
    } else {
      return new ResponseDto(400, 'Tạo khu vực mới thất bại');
    }
  }

  @Get()
  async findAll() {
    const result = await this.areaArroundService.findAll();
    if (result) {
      return new ResponseDto(
        200,
        'Lấy danh sách khu vực xung quanh thành công',
        result,
      );
    } else {
      return new ResponseDto(400, 'Lấy danh sách khu vực xung quanh thất bại');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  async updateById(@Body() dto: UpdateAreaArroundDto, @Param('id') id: string) {
    const result = await this.areaArroundService.update(dto, id);
    if (result) {
      return new ResponseDto(200, 'Cập nhập khu vực thành công');
    } else {
      return new ResponseDto(400, 'Cập nhập khu vực thất bại');
    }
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<any>> {
    const result = await this.areaArroundService.delete(id);
    if (result) {
      return new ResponseDto(200, 'Xóa khu vực thành công');
    } else {
      return new ResponseDto(400, 'Xóa khu vực thất bại');
    }
  }
}
