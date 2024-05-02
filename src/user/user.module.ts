import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users } from '../entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalHelper } from '../helpers/global.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, GlobalHelper],
})
export class UserModule {}
