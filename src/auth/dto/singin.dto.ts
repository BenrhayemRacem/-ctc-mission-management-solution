import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
