import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string;
}
