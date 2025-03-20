import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const CloudinaryStorageConfig = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads',
      resource_type: 'auto', // Hỗ trợ cả video và ảnh
      public_id: file.originalname.split('.')[0], // Đặt tên file theo tên gốc
    };
  },
});
