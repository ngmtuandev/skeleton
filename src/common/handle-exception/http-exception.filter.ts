import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof QueryFailedError) {
      // Nếu lỗi là do ENUM không hợp lệ
      if (exception.message.includes('invalid input value for enum')) {
        return response.status(400).json({
          success: false,
          statusCode: 400,
          message: `Giá trị không hợp lệ cho ENUM: ${exception.driverError.detail || 'Kiểm tra lại dữ liệu đầu vào'}`,
          timestamp: new Date().toISOString(),
        });
      }

      // Trả về lỗi mặc định cho các lỗi truy vấn khác
      return response.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Lỗi truy vấn dữ liệu',
        error: exception.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Xử lý lỗi HTTP khác
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.getResponse
      ? exception.getResponse()
      : 'Internal Server Error';

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
