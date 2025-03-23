import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import IUser from 'src/common/types/user';
import { JwtService } from '@nestjs/jwt';
import { RefreshModelAction } from './refresh.model-action';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private refreshModelAction: RefreshModelAction,
  ) {}

  async register(registerDto: RegisterDto) {
    // check if user exist
    const userExist = await this.usersService.getUserByEmail(registerDto.email);

    if (userExist) {
      throw new BadRequestException('Account already Exist');
    }

    // hash password
    const hashedPassword = this.hashPassword(registerDto.password);

    const body = { ...registerDto, hashedPassword: hashedPassword };
    // save user
    const user = await this.usersService.createUser(body);

    if (!user) {
      throw new InternalServerErrorException('User was not created');
    }

    // sign with jwt
    const payload = { sub: user.data?.id, email: user.data?.email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.access_expiry'),
    });

    const refreshToken = await this.generateRefreshToken(user.data!);

    return { user: user!.data, accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {}

  private hashPassword(password: string) {
    const salt = +this.configService.get('bcrypt.salt');
    return bcrypt.hashSync(password, salt);
  }

  async generateRefreshToken(user: IUser) {
    // check if user has a refresh token, and time hasn't expired
    const expiry_time = new Date();
    const refreshRecord = await this.refreshModelAction.get(
      {
        userId: user.id,
      },
      { expiry_time: { $gte: expiry_time } },
    );

    console.log(refreshRecord);

    // update refresh token if exist

    const refreshToken = uuidv4();

    expiry_time.setHours(
      expiry_time.getHours() + +this.configService.get('jwt.refresh_expiry'),
    );

    // create refresh token and return
    const body = {
      userId: user.id,
      refreshToken,
      expiry_time,
    };

    await this.refreshModelAction.upsert({
      identifierOptions: { userId: user.id },
      upsertPayload: body,
      transactionOptions: {
        useTransaction: false,
      },
    });

    return refreshToken;
  }
}
