import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsIdentityCard,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';
import { RolesEnum } from '../enums/roles.enum';
import { Match } from "../decorators/match.decorator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsIdentityCard('ar-TN')
  cin: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @Match('password')
  repeat_password: string;

  @IsOptional()
  profileImage:string;
}
