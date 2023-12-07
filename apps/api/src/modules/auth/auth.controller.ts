import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';

@ApiTags(AuthConfig.SWAGGER_FEATURE)
@Controller(AuthConfig.API_ROUTE)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The Jwt Access Token',
    type: JwtTokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req): Promise<JwtTokenDto> {
    return this.authService.login(req.user);
  }
}
