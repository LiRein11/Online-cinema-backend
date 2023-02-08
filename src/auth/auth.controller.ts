import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() dto: any) {
    return this.AuthService.register(dto);
  } // Для валидации входных данных
} // Создаем путь для авторизации .../auth/register. В контроллере происходит обработка данных, они приходят, мы их отправляем в наш сервис, а там происходит основная логика, а затем контроллер отвечает либо готовыми данными, либо ошибкой.
