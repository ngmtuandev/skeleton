import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UtilityService } from './utility.service';
import { CreateUtilityDto } from './dto/create.utility.dto';

@ApiTags('utility')
@UseFilters(HttpExceptionFilter)
@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Post()
  async create(@Body() dto: CreateUtilityDto): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
