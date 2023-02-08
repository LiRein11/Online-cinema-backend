import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET'),
});
