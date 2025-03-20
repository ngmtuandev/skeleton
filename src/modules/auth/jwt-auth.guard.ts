import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { MyService } from 'src/config/config.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private myService: MyService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    try {
      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token, {
        secret: this.myService.getJwtSecret(),
      });

      req.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
