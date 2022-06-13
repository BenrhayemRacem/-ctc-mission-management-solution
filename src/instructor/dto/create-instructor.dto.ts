import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { UseFilters } from '@nestjs/common';
import { UploadExceptionFilter } from '../upload-exception.filter';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateInstructorDto {
  @IsNotEmpty()
  user: CreateUserDto;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
  @IsNotEmpty()
  professionalImage: string;

  @IsNotEmpty()
  cv: string;

  @IsNotEmpty()
  resume: string;
}
