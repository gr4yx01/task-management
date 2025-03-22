import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { UserModelAction } from './user.model-action';

@Injectable()
export class UsersService {
  constructor(
    private userModelAction: UserModelAction
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    return await this.userModelAction.create({
      createPayload: { ...createUserDto, hashedPassword: createUserDto.password },
      transactionOptions: {
        useTransaction: false
      }
    });
  }
}
