import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.provider';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: any, folder: string) {
    return await this.cloudinaryService.uploadFile(file, folder);
  }
}
