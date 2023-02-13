import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface ActorModel extends Base {} // Чтобы айдишник и дата создания, которые сами создаются, были у нас тут

export class ActorModel extends TimeStamps {
  @prop({ unique: true }) // Тут задаются любые опции для поля, которое располагается ниже
  slug: string;

  @prop()
  name: string;

  @prop()
  photo: string;
} // Model это обычный класс, с определенными декораторами, которые расширяют функционал
