import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/user.dto';

export class RegisterDto extends OmitType(CreateUserDto, ['hashedPassword']) {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
