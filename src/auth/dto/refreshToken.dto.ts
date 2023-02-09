import { IsString } from 'class-validator';

export class RefreshTokenDto{
  @IsString({
    message: 'You did not pass refresh token or it is not a string'
  })
  refreshToken: string  // Будет приходить рефреш токен, по которому будет происходить проверка, если это тот токен, то находится юзер и отдается новая пара токенов
}