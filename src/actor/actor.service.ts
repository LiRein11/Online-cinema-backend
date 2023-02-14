import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ActorModel } from './actor.model';
import { ActorDto } from './actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>,
  ) {}

  async bySlug(slug: string) {
    const doc = await this.ActorModel.findOne({ slug }).exec();
    if (!doc) throw new NotFoundException('Actor not found');
    return doc;
  }

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, 'i'), // i - независимо от регистра поиск
          },
          {
            slug: new RegExp(searchTerm, 'i'), // i - независимо от регистра поиск
          },
        ], // Условия, по которым будем искать пользователя
      };
    }
    
    // Агрегация  
    return this.ActorModel.aggregate()
      .match(options)
      .lookup({
        from: 'Movie',
        foreignField: 'actors',
        localField: '_id',
        as: 'movies',
      })
      .addFields({
        countMovies: {
          $size: '$movies',
        },
      })
      .project({ __v: 0, updatedAt: 0, movies: 0 })
      .sort({ createdAt: -1 })
      .exec();
  } // aggregate - метод, чтобы все остальные последующие нормально отработали, далее - match((оператор)суть похожа на find), lookup - метод для определенного перебора таблицы (по опшинсам), затем добавляем поле и узнаем размер массива в этом поле. А всё это делается для того, чтобы у каждого актера было известно, в каком количестве фильмов он отыграл свою роль. Project это типо select, поволяет убрать поля, которые лишние.

  /*Admin place*/

  async byId(_id: string) {
    const actor = await this.ActorModel.findById(_id);
    if (!actor) throw new NotFoundException('Actor not found');

    return actor;
  }

  async create() {
    const defaultValue: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    };

    const actor = await this.ActorModel.create(defaultValue);
    return actor._id;
  }

  async update(_id: string, dto: ActorDto) {
    const updateDoc = await this.ActorModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec();

    if (!updateDoc) throw new NotFoundException('actor not found');

    return updateDoc;
  }

  async delete(id: string) {
    const deleteDoc = await this.ActorModel.findByIdAndDelete(id).exec();

    if (!deleteDoc) throw new NotFoundException('actor not found');

    return deleteDoc;
  }
}
