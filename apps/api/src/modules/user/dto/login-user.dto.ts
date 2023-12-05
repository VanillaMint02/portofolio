import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'JohnSnow@Kingslanding.com',
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'TheUnbreakableUndefeatableUnfathomablePassword01',
    required: true,
  })
  password: string;

  constructor(values: Partial<LoginUserDto>) {
    if (values) {
      this.password = values.password;
      this.email = values.email;
    }
  }
}
