import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { TypePropertyService } from './type.property.service';
import { CreateTypePropertyDto } from './dto/create.type.property.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('type-property')
@UseFilters(HttpExceptionFilter)
@Controller('type-property')
export class TypePropertyController {
  constructor(private readonly typePropertyService: TypePropertyService) {}

  @Post()
  async create(@Body() dto: CreateTypePropertyDto): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
