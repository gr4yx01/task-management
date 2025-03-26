import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { omit } from 'lodash';
import { MoreThan } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

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

    const userPayload = omit(registerDto, ['password']);

    const body = { ...userPayload, hashedPassword: hashedPassword };
    // save user
    const user = await this.usersService.createUser(body);

    if (!user) {
      throw new InternalServerErrorException('User was not created');
    }

    // sign with jwt
    const tokens = await this.generateRefreshToken(user.data!);

    return { user: user!.data, ...(tokens as object) };
  }

  async login(loginDto: LoginDto) {
    const userExist = await this.usersService.getUserByEmail(loginDto.email);

    if (!userExist) {
      throw new NotFoundException('Account does not exist');
    }

    // verify is password is correct
    const validPassword = this.verifyPassword(
      loginDto.password,
      userExist.hashedPassword,
    );

    if (!validPassword) {
      throw new BadRequestException('Invalid Credential');
    }

    // generate refresh token
    const tokens = await this.generateRefreshToken(userExist);

    // return data
    return { user: userExist, ...(tokens as object) };
  }

  async refresh(refreshToken: string) {
    const refreshRecordExist = await this.refreshModelAction.get(
      {
        refreshToken,
      },
      {},
      ['user'],
    );

    if (!refreshRecordExist) {
      throw new NotFoundException('Invalid refresh token');
    }

    // return refresh alongside access token
    return this.generateRefreshToken(refreshRecordExist.user);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    // verify token

    // check if user exist

    // change password
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    // generate reset token
    const user = await this.usersService.getUserByEmail(forgotPasswordDto.email)

    if(!user) {
      throw new NotFoundException('No such account')
    }

    // send email
  }

  async changePassword() {}

  private hashPassword(password: string) {
    const salt = +this.configService.get('bcrypt.salt');
    return bcrypt.hashSync(password, salt);
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateAccessToken(user: IUser): Promise<string> {
    const payload = { sub: user.id, email: user.email };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.access_expiry'),
    });
  }

  async generateRefreshToken(user: IUser) {
    // check if user has a refresh token, and time hasn't expired
    const expiry_time = new Date();
    const refreshRecord = await this.refreshModelAction.get({
      userId: user.id,
      expiry_time: MoreThan(expiry_time),
    });
    const accessToken = await this.generateAccessToken(user);

    if (refreshRecord) {
      return {
        refreshToken: refreshRecord.refreshToken,
        accessToken,
      };
    }

    const refreshToken = uuidv4();

    expiry_time.setHours(
      expiry_time.getHours() + +this.configService.get('jwt.refresh_expiry'),
    );

    // create refresh token and retur
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

    return { refreshToken, accessToken };
  }

  async getUserProfile(userId: string) {
    const user = await this.usersService.getUserById(userId);

    return { data: user };
  }
}
