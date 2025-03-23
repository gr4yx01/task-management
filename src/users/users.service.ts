import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { UserModelAction } from './user.model-action';

@Injectable()
export class UsersService {
  constructor(private userModelAction: UserModelAction) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModelAction.create({
      createPayload: {
        ...createUserDto,
      },
      transactionOptions: {
        useTransaction: false,
      },
    });

    return {
      data: user,
    };
  }

  async getUserByEmail(email: string) {
    return await this.userModelAction.get({ email });
  }
}
