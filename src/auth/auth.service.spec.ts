import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '@/email/email.service';
import { RefreshModelAction } from './refresh.model-action';
import { UserModelAction } from '@/users/user.model-action';
import * as SYS_MSG from '@/common/system-messages';
import { BadRequestException } from '@nestjs/common';

const mockCreatedUser = {
  id: '1',
  name: 'user-a',
  email: 'user@gmail.com',
  createdAt: new Date('2023-03-08T09:00:00.000Z'),
  updatedAt: new Date('2023-03-08T09:00:00.000Z'),
  hashedPassword: 'user-password-1',
};

const mockUserService = {
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
};

const mockRefreshModelAction = {};

const mockUserModelAction = {};

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;
  let jwtService: JwtService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        JwtService,
        EmailService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: RefreshModelAction,
          useValue: mockRefreshModelAction,
        },
        {
          provide: UserModelAction,
          useValue: mockUserModelAction,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register', () => {
    const newUser = {
      email: 'user@gmail.com',
      name: 'user-a',
      password: 'Pyr@horneet0101',
    };

    it('should throw an error if user already exist', async () => {
      const user = jest
        .spyOn(mockUserService, 'getUserByEmail')
        .mockResolvedValue(mockCreatedUser);

      expect(user).toBeDefined();

      await expect(service.register(newUser)).rejects.toThrow(
        BadRequestException,
      );

      await expect(service.register(newUser)).rejects.toMatchObject({
        message: SYS_MSG.ACCOUNT_EXISTS,
      });
    });

    it('should register a user', async () => {
      mockUserService.getUserByEmail.mockResolvedValue(null);

      const user = await mockUserService.getUserByEmail('user-123@gmail.com');

      expect(user).toBeNull();

      mockUserService.createUser.mockResolvedValue(mockCreatedUser);

      const newCreatedUser = await mockUserService.createUser(newUser);

      expect(newCreatedUser).toBe(mockCreatedUser);
    });
  });

  describe('Login', () => {
    const loginPayload = {
      email: 'user@gmail.com',
      password: 'userhdf92-39df',
    };

    it('should throw an error if password is incorrect', async () => {
      jest.spyOn(service, 'verifyPassword').mockResolvedValue(false);

      jest
        .spyOn(mockUserService, 'getUserByEmail')
        .mockResolvedValue(mockCreatedUser);

      const verifyPassword = await service.verifyPassword(
        loginPayload.password,
        mockCreatedUser.hashedPassword,
      );

      expect(verifyPassword).toBeFalsy();
    });

    it('should successfully log user in', async () => {
      jest
        .spyOn(mockUserService, 'getUserByEmail')
        .mockResolvedValue(mockCreatedUser);

      expect(mockUserService.getUserByEmail(loginPayload.email)).toBeDefined();

      jest.spyOn(service, 'generateRefreshToken').mockResolvedValue({
        accessToken: 'ey-dfhksd93-sdfhksdf;kfhs83-df',
        refreshToken: 'ey93fdksd-dfhsf3-sdfhsdf-3233',
      });

      expect(await service.generateRefreshToken(mockCreatedUser)).toMatchObject(
        {
          accessToken: 'ey-dfhksd93-sdfhksdf;kfhs83-df',
          refreshToken: 'ey93fdksd-dfhsf3-sdfhsdf-3233',
        },
      );
    });
  });
});
