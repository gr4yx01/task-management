import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { EntitySchema } from 'typeorm';
import { UserModelAction } from './user.model-action';

@Module({
  imports: [TypeOrmModule.forFeature([User, EntitySchema])],
  controllers: [UsersController],
  providers: [UsersService, UserModelAction],
})
export class UsersModule {}
