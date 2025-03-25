import {
  Controller,
  Post,
  Body,
  UseFilters,
  Get,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { TypePropertyService } from './type.property.service';
import { CreateTypePropertyDto } from './dto/create.type.property.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ERole } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/common/guards/role.guards';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ECommon } from 'src/common/enums/common.enum';
import { UpdateTypePropertyDto } from './dto/update.type.property.dto';

@ApiTags('type-property')
@UseFilters(HttpExceptionFilter)
@Controller('type-property')
export class TypePropertyController {
  constructor(private readonly typePropertyService: TypePropertyService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateTypePropertyDto): Promise<ResponseDto<any>> {
    const result = await this.typePropertyService.create(dto);

    if (result === ECommon.EXIST) {
      return new ResponseDto(400, 'Loại tài sản này đã tồn tại');
    } else if (result) {
      return new ResponseDto(201, 'Tạo mới loại tài sản thành công', result);
    } else {
      return new ResponseDto(400, 'Tạo mới loại tài sản thất bại');
    }
  }

  @Get()
  async findAll() {
    const result = await this.typePropertyService.findAll();
    if (result) {
      return new ResponseDto(
        200,
        'Lấy danh sách loại tài sản thành công',
        result,
      );
    } else {
      return new ResponseDto(400, 'Lấy danh sách loại tài sản thất bại');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  async updateById(
    @Body() dto: UpdateTypePropertyDto,
    @Param('id') id: string,
  ) {
    const result = await this.typePropertyService.update(dto, id);
    if (result) {
      return new ResponseDto(200, 'Cập nhập loại tài sản thành công');
    } else {
      return new ResponseDto(400, 'Cập nhập loại tài sản thất bại');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RoleGuard(ERole.ADMIN))
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    const result = await this.typePropertyService.delete(id);
    if (result) {
      return new ResponseDto(200, 'Xóa loại tài sản thành công');
    } else {
      return new ResponseDto(400, 'Xóa loại tài sản thất bại');
    }
  }
}
