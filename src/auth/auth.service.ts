import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {} // Добавляем сущность, с помощью которой будут происходить запросы к бд
  async register(dto: any) {
    const newUser = new this.UserModel(dto);
    return newUser.save();
  }
}
