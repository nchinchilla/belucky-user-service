import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JwtResponseDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
