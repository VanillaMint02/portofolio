import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(dto: LoginUserDto): Promise<UserDto | null> {
    const isValid = await this.usersService.checkCredentials(dto);
    if (isValid) {
      return await this.usersService.getUserByEmail(dto.email);
    }
    return null;
  }

  async login(dto: JwtPayloadDto): Promise<JwtTokenDto> {
    return {
      access_token: this.jwtService.sign({
        email: dto.email,
        sub: dto.userId,
      }),
    };
  }
}
