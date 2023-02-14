import { Ref, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { MovieModel } from 'src/movie/movie.model';
import { UserModel } from 'src/user/user.model';

export interface RatingModel extends Base {} // Чтобы айдишник и дата создания, которые сами создаются, были у нас тут

export class RatingModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  userId: Ref<UserModel>;

  @prop({ ref: () => MovieModel })
  movieId: Ref<MovieModel>;

  @prop()
  value: number;
} // Model это обычный класс, с определенными декораторами, которые расширяют функционал
