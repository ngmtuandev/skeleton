import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { CloudinaryStorageConfig } from 'src/config/cloudinary/cloudinary.storage';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // swagger
  @ApiOperation({ summary: 'Upload file lên Cloudinary (hỗ trợ ảnh & video)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chọn file để upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Swagger nhận biết đây là file upload
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded thành công.' })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', { storage: CloudinaryStorageConfig }),
  )
  async uploadFile(@UploadedFile() file: any): Promise<ResponseDto<any>> {
    const result = await this.uploadService.uploadFile(file, 'uploads');
    return new ResponseDto(201, 'Tải ảnh/video thành công', result);
  }
}
