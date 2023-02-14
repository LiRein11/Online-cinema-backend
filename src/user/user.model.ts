import { Ref, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { MovieModel } from 'src/movie/movie.model';

export interface UserModel extends Base {} // Чтобы айдишник и дата создания, которые сами создаются, были у нас тут

export class UserModel extends TimeStamps {
  @prop({ unique: true }) // Тут задаются любые опции для поля, которое располагается ниже
  email: string;

  @prop()
  password: string;

  @prop({ default: false })
  isAdmin: boolean;

  @prop({ default: [], ref: () => MovieModel }) // Ref отдаёт айдишники наших фильмов
  favorites?: Ref<MovieModel>[];
} // Model это обычный класс, с определенными декораторами, которые расширяют функционал
