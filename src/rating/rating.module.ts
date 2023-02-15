import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { RatingModel } from './rating.model';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  controllers: [RatingController],  
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
    ]),
    MovieModule, // Импортирование происходит, т.к. какие-то сервисы муви модуля используются в рейтинге
  ],
  providers: [RatingService],
  exports: [RatingService]
})
export class RatingModule {}
