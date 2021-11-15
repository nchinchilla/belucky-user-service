import { IsNumber, IsString } from 'class-validator';

export class AuthUser {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  jwt: string;
}
