import { ApiProperty } from '@nestjs/swagger';

export class UserWithAddressDto {
  @ApiProperty({ type: 'number' })
  id: number;
  @ApiProperty({ type: 'string' })
  name: string;
  @ApiProperty({ type: 'string' })
  address: {
    street: string;
    city: string;
    country: string;
  };
}
