import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'password',
  'repeat_password',
]) {
  @IsNotEmpty()
  @MinLength(8)
  old_password: string;
}
