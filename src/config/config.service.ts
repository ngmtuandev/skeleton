import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) { }

  getDatabaseUrl(): string | undefined {
    return this.configService.get<string>('DATABASE_URL');
  }

  getJwtSecret(): string | undefined {
    return this.configService.get<string>('JWT_SECRET');
  }
}
