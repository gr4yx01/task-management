import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { RefreshModelAction } from './refresh.model-action';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refresh } from './model/refresh.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Refresh]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
      global: true,
    }),
    EmailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshModelAction],
})
export class AuthModule {}
