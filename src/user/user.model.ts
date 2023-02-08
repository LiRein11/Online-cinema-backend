import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {} // Чтобы айдишник и дата создания, которые сами создаются, были у нас тут

export class UserModel extends TimeStamps {
  @prop({ unique: true }) // Тут задаются любые опции для поля, которое располагается ниже
  email: string;

  @prop()
  password: string;

  @prop({ default: false })
  isAdmin: boolean;

  @prop({ default: [] })
  favorites?: [];
} // Model это обычный класс, с определенными декораторами, которые расширяют функционал
