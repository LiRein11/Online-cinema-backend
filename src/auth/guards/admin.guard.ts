import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserModel }>();
    const user = request.user;

    if (!user.isAdmin) throw new ForbiddenException('You have no rights!');

    return user.isAdmin;
  }
} // implements значит, что мы внедряем CanActivate. В jwt.guards нужно наследоваться (extends), потому что там мы берем за основу готовый класс от guard, а тут мы сами создаем индивидуальный (всё есть в документашке)
