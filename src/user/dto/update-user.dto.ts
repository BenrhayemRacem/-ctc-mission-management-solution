import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

 export class UpdateUserDtoAll extends PartialType(CreateUserDto) {}

export class UpdateUserDto extends OmitType(UpdateUserDtoAll, [
  'cin',
  'repeat_password',
  'password'
]) {
  @IsNotEmpty()
  confirmationPassword: string;
}
