import { createParamDecorator } from '@nestjs/common/decorators';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { UserModel } from '../user.model';

type TypeData = keyof UserModel; // Получаем все ключи (email,password и тд) из UserModel

export const User = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
); // Из документашки
