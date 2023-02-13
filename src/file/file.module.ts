import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`, // Путь к папке
      serveRoot: '/uploads', // Создаём статичную папку для файлов
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
