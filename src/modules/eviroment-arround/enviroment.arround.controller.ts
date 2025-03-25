import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { EnviromentArroundService } from './enviroment.arround.service';
import { CreateEnviromentArroundDto } from './dto/create.enviroment.arround';

@ApiTags('enviroment-arround')
@UseFilters(HttpExceptionFilter)
@Controller('enviroment-arround')
export class EnviromentArroundController {
  constructor(
    private readonly enviromentArroundService: EnviromentArroundService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateEnviromentArroundDto,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(201, 'Tạo mới người dùng thành công', null);
  }
}
