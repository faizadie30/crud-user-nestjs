import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GlobalHelper } from './helpers/global.helper';
import cors from './config/cors';
import helmet from './config/helmet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [cors, helmet],
    }),
    UserModule,
  ],
  providers: [GlobalHelper],
})
export class AppModule {}
