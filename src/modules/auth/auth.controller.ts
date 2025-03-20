import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { HttpExceptionFilter } from 'src/common/handle-exception/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() infoRequest: LoginDto) {
    const user = await this.authService.validateUser(
      infoRequest.phoneNumber,
      infoRequest.password,
    );
    const result = await this.authService.login(user);
    return new ResponseDto(200, 'Đăng nhập thành công', result);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }
}
