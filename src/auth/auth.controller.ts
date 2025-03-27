import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SkipAuth } from './decorators/skipAuth.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Request } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { request } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @SkipAuth()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @SkipAuth()
  @Post('refresh')
  refresh(@Body() refreshDto: { refreshToken: string }) {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @SkipAuth()
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @SkipAuth()
  @Post('forgot-password')
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Req() request: Request,
  ) {
    const referer = request.headers.referer;

    return this.authService.forgotPassword(
      forgotPasswordDto,
      referer as string,
    );
  }

  @Post('change-password')
  changePassword(@Req() request, @Body() changePasswordDto: ChangePasswordDto) {
    const loggedInUserId = request.user.sub;

    return this.authService.changePassword(changePasswordDto, loggedInUserId);
  }

  @Get('me')
  userProfile(@Req() request) {
    const loggedInUserId = request.user.sub;

    return this.authService.getUserProfile(loggedInUserId);
  }
}
