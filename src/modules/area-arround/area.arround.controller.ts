import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AreaArroundService } from './area.arround.service';
import { CreateAreaArroundDto } from './dto/create.area.arround.dto';

@ApiTags('area-arround')
@UseFilters(HttpExceptionFilter)
@Controller('area-arround')
export class AreaArroundController {
  constructor(private readonly areaArroundService: AreaArroundService) {}

  @Post()
  async create(@Body() dto: CreateAreaArroundDto): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
