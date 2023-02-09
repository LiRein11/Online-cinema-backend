import { RefreshTokenDto } from './dto/refreshToken.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UsePipes(new ValidationPipe()) // Валидация данных
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.AuthService.login(dto);
  } // Для валидации входных данных

  @UsePipes(new ValidationPipe()) // Валидация данных
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.AuthService.getNewTokens(dto);
  } // Для валидации входных данных

  @UsePipes(new ValidationPipe()) // Валидация данных
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.AuthService.register(dto);
  } // Для валидации входных данных
} // Создаем путь для авторизации .../auth/register. В контроллере происходит обработка данных, они приходят, мы их отправляем в наш сервис, а там происходит основная логика, а затем контроллер отвечает либо готовыми данными, либо ошибкой.
