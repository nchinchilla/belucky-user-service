import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsBoolean,
  Equals,
} from 'class-validator';

export class JwtResponseDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
