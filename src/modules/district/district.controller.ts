import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guards';
import { ERole } from 'src/common/enums/role.enum';
import { ECommon } from 'src/common/enums/common.enum';
import { RequestWithPaginationDto } from 'src/common/dto/request.with.pagination.dto';
import { CreateDistrictDto } from './dto/create.district.dto';
import { DistrictService } from './district.service';

@ApiTags('district')
@UseFilters(HttpExceptionFilter)
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateDistrictDto): Promise<ResponseDto<any>> {
    const result = await this.districtService.create(dto);
    if (result === ECommon.NOT_EXIST) {
      return new ResponseDto(400, 'Tỉnh thành không tồn tại');
    } else if (result) {
      return new ResponseDto(201, 'Tạo mới Thành công', result);
    } else {
      return new ResponseDto(400, 'Tạo tỉnh mới thất bại');
    }
  }

  @Get()
  async findAll(@Query() request: RequestWithPaginationDto) {
    const result = await this.districtService.findAll(request);
    if (result) {
      return new ResponseDto(
        200,
        'Lấy danh sách Quận/huyện sản thành công',
        result,
      );
    } else {
      return new ResponseDto(400, 'Lấy danh sách Quận/huyện sản thất bại');
    }
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<any>> {
    const result = await this.districtService.delete(id);
    if (result) {
      return new ResponseDto(200, 'Xóa Quận/huyện thành công');
    } else {
      return new ResponseDto(400, 'Xóa Quận/huyện thất bại');
    }
  }
}
