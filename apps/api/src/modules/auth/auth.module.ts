import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '6000s' },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    UserService,
    RolesGuard,
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
