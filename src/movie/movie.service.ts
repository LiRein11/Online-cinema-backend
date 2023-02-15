import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MovieModel } from './movie.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UpdateMovieDto } from './update-movie.dto';
import { Types } from 'mongoose';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
    private readonly telegramService: TelegramService,
  ) {}

  async bySlug(slug: string) {
    const doc = await this.MovieModel.findOne({ slug })
      .populate('actors genres')
      .exec(); // populate позволяет развернуть айдишники в объекты
    if (!doc) throw new NotFoundException('Movie not found');
    return doc;
  }

  async byActor(actorId: Types.ObjectId) {
    const docs = await this.MovieModel.find({ actors: actorId }).exec(); // populate позволяет развернуть айдишники в объекты
    if (!docs) throw new NotFoundException('Movies not found');
    return docs;
  }

  async byGenres(genreIds: Types.ObjectId[]) {
    const docs = await this.MovieModel.find({ genres: { $in: genreIds } }) // Используем такую схему когда ищем массив в массиве
      .exec(); // populate позволяет развернуть айдишники в объекты
    if (!docs) throw new NotFoundException('Movies not found');
    return docs;
  }

  async updateCountOpened(slug: string) {
    const updateDoc = await this.MovieModel.findOneAndUpdate(
      { slug },
      {
        $inc: { countOpened: 1 },
      },
      {
        new: true,
      },
    ).exec();

    if (!updateDoc) throw new NotFoundException('Movie not found');

    return updateDoc;
  }

  async getMostPopular() {
    return this.MovieModel.find({ countOpened: { $gt: 0 } })
      .sort({ countOpened: -1 })
      .populate('genres')
      .exec(); // populate позволяет развернуть айдишники в объекты
  } // Нахождение самого популярного фильма

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'), // i - независимо от регистра поиск
          },
        ], // Условия, по которым будем искать пользователя
      };
    }

    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('actors genres')
      .exec();
  } // searchTerm - поисковой запрос

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.MovieModel.findByIdAndUpdate(
      id,
      {
        rating: newRating,
      },
      {
        new: true,
      },
    ).exec();
  }

  /*Admin place*/

  async byId(_id: string) {
    const doc = await this.MovieModel.findById(_id);
    if (!doc) throw new NotFoundException('Movie not found');

    return doc;
  }

  async create() {
    const defaultValue: UpdateMovieDto = {
      bigPoster: '',
      actors: [],
      genres: [],
      poster: '',
      title: '',
      videoUrl: '',
      slug: '',
    };

    const movie = await this.MovieModel.create(defaultValue);
    return movie._id;
  }

  async update(_id: string, dto: UpdateMovieDto) {
    if (!dto.isSendTelegram) {
      await this.sendNotification(dto);
      dto.isSendTelegram = true;
    }

    const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec();

    if (!updateDoc) throw new NotFoundException('Movie not found');

    return updateDoc;
  }

  async delete(id: string) {
    const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec();

    if (!deleteDoc) throw new NotFoundException('Movie not found');

    return deleteDoc;
  }

  async sendNotification(dto: UpdateMovieDto) {
    // if (process.env.NODE_ENV !== 'development') {
    // await this.telegramService.sendPhoto(dto.poster);
    // }
    await this.telegramService.sendPhoto(
      'https://img.osobnosti.cz/film/1072120-john-wick/O763110-6e4ab.jpg',
    );

    const msg = `<b>${dto.title}</b>`;

    await this.telegramService.sendMessage(msg, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              url: 'https://okko.tv/movie/free-guy',
              text: 'Go to watch',
            },
          ],
        ],
      },
    });
  }
}
