import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ type: 'string' })
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty({ type: 'string' })
  @IsNumber()
  @IsNotEmpty()
  countryId: number;
}
