import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestModule } from '../app-test.module';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { AuthService } from '../../src/modules/auth/auth.service';
import { UserService } from '../../src/modules/user/user.service';
import { UserModule } from '../../src/modules/user/user.module';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../src/modules/user/dto/login-user.dto';
import { apiPaths } from '../../src/utils/api.paths';

describe('AuthController e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule, AuthModule, UserModule],
      providers: [AuthService, UserService, JwtService],
    }).compile();
    app = moduleFixture.createNestApplication();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should fail to login an user', async () => {
    const loginUserDto: LoginUserDto = new LoginUserDto({
      email: 'KenshinHimura@email.com',
      password: 'KenshinHimuraPassword01?!',
    });
    return request(app.getHttpServer())
      .post(apiPaths.API_AUTH_LOGIN)
      .send(loginUserDto)
      .expect(401);
  });

  it('should login a user successfully', async () => {
    const loginUserDto: LoginUserDto = new LoginUserDto({
      email: 'RealKenshinHimura@gmail.com',
      password: 'RealKenshinHimuraPassword112?',
    });
    return request(app.getHttpServer())
      .post(apiPaths.API_AUTH_LOGIN)
      .send(loginUserDto)
      .expect(200);
  });
});
