import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString, ValidateNested
} from "class-validator";

import { OrganismNautreEnum } from '../enums/organism-nature.enum';
import { User } from '../../user/entities/user.entity';
import { CreateUserDto } from "../../user/dto/create-user.dto";

export class CreateOrganismDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  activity: string;

  @IsNotEmpty()
  @IsNumberString()
  taxRegistrationNumber: string;

  @IsNotEmpty()
  contactPersonPosition: string;

  @IsNotEmpty()
  @IsEnum(OrganismNautreEnum)
  nature: OrganismNautreEnum;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  numberOfEmployees: number;

  @IsOptional()
  subsidiary: string;

  @IsOptional()
  trainingNeeds: string;


  @IsNotEmpty()
  contactPerson: CreateUserDto;
}
