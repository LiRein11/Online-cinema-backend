import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Везде будет добавляться глобальный префикс api localhost/api/users
  await app.listen(4200);
}
bootstrap();
