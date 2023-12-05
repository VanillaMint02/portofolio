import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { UserDto } from '../../user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UserDto> {
    const user = await this.authService.validate(
      new LoginUserDto({
        email,
        password,
      }),
    );
    if (!user) {
      throw new UnauthorizedException('Invalid user or e-mail');
    }
    return user;
  }
}
