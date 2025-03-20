import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService],
})
export class UploadModule {}
