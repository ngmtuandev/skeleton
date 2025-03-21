import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { AcreageService } from './acreage.service';
import { CreateAcreageDto } from './dto/create.acreage.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('acreage')
@UseFilters(HttpExceptionFilter)
@Controller('acreage')
export class AcreageController {
  constructor(private readonly acreageService: AcreageService) {}

  @Post()
  async create(@Body() dto: CreateAcreageDto): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
