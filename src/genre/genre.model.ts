import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface GenreModel extends Base {} // Чтобы айдишник и дата создания, которые сами создаются, были у нас тут

export class GenreModel extends TimeStamps {
  @prop()
  name: string;

  @prop({ unique: true })
  slug: string;

  @prop()
  description: string;

  @prop()
  icon: string;
} // Model это обычный класс, с определенными декораторами, которые расширяют функционал
