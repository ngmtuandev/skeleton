import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ERole } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: ERole.ADMIN | ERole.USER) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return req.user && req.user.role === this.role;
  }
}
