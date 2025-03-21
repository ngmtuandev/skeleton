import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateProvinceDto } from './dto/create.province.dto';
import { ProvinceService } from './province.service';

@ApiTags('province')
@UseFilters(HttpExceptionFilter)
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  async create(@Body() dto: CreateProvinceDto): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
