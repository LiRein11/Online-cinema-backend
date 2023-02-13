import { Ref, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ActorModel } from 'src/actor/actor.model';
import { GenreModel } from 'src/genre/genre.model';

export interface MovieModel extends Base {} // Чтобы айдишник и дата создания, которые сами создаются, были у нас тут

export class Parameters {
  @prop()
  year: number;

  @prop()
  duration: number;

  @prop()
  country: string;
}

export class MovieModel extends TimeStamps {
  @prop()
  poster: string;

  @prop()
  bigPoster: string;

  @prop()
  title: string;

  @prop({ unique: true })
  slug: string;

  @prop()
  description: string;

  @prop()
  parameters?: Parameters;

  @prop({ default: 4.0 })
  rating?: number;

  @prop()
  videoUrl: string;

  @prop({ default: 0 })
  countOpened?: number; // Счётчик открытий фильма

  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[];

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]; // Ref для того, чтобы например потом брать actors[0].name и легко выводить нужную информацию

  @prop({ default: false })
  isSendTelegram?: boolean;
} // Model это обычный класс, с определенными декораторами, которые расширяют функционал
