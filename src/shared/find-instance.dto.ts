import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";


export class findInstanceDto  {
  
@IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort :string ;
@IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  page : number ;

@IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  perPage : number;

@IsOptional()
  @IsString()
  orderBy : string


}