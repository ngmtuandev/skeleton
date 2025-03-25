import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ImagePropertyService } from './image.property.service';
import { CreateImagePropertyDto } from './dto/create.image.property';

@ApiTags('image-property')
@UseFilters(HttpExceptionFilter)
@Controller('image-property')
export class ImagePropertyController {
  constructor(private readonly imagePropertyService: ImagePropertyService) {}

  @Post()
  async create(@Body() dto: CreateImagePropertyDto): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
