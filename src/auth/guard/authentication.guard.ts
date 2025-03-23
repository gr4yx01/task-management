import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/skipAuth.decorator';
import JwtPayload from 'src/common/types/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = await this.extrackTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // verify token
    const payload: JwtPayload = await this.verifyToken(token);

    // pass payload to req.user
    request.user = payload;

    return true;
  }

  async extrackTokenFromHeader(request: Request) {
    return request.headers.authorization?.split(' ')[1];
  }

  async verifyToken(token: string) {
    return await this.jwtService.decode(token);
  }
}
