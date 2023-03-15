import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Везде будет добавляться глобальный префикс api localhost/api/users
  app.enableCors() // Важно прописать, иначе запросы со стороннего URL не будут отправляться (с 3000 порта на 4200 когда отправка идет с клиента, то без этой команды будет ошибка)
  await app.listen(4200);
}
bootstrap();
