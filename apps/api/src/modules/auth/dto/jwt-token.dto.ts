import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty({ description: 'The JWT access token.' })
  access_token: string;
}
