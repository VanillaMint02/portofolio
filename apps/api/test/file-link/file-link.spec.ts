import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestModule } from '../app-test.module';
import { UserModule } from '../../src/modules/user/user.module';
import { PortfolioEntryModule } from '../../src/modules/portofolio-entry/portfolio-entry.module';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UserService } from '../../src/modules/user/user.service';
import { PortfolioEntryService } from '../../src/modules/portofolio-entry/portfolio-entry.service';
import { FileLinkModule } from '../../src/modules/file-link/file-link.module';
import { FileLinkService } from '../../src/modules/file-link/file-link.service';
import * as request from 'supertest';
import { apiPaths } from '../../src/utils/api.paths';
import { CreateFileLinkDto } from '../../src/modules/file-link/dto/create-file-link.dto';
import { FileLinkMode } from '../../src/modules/file-link/domain/file-link.mode';

describe('FileLinkController e2e', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  let objectKey: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestModule,
        UserModule,
        FileLinkModule,
        PortfolioEntryModule,
        AuthModule,
      ],
      providers: [UserService, PortfolioEntryService, FileLinkService],
    }).compile();
    app = moduleFixture.createNestApplication();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    await app.init();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = jwtService.sign({
      email: 'RealKenshinHimura@email.com',
      sub: '9da8401b-7c1a-496d-b899-e7fbe2412f01',
    });
  });
  afterAll(async () => {
    await app.close();
  });

  it('should fail to retrieve a logo due to an invalid portfolioEntryId', async () => {
    const response = await request(app.getHttpServer())
      .get(
        `${apiPaths.FILE_LINK_PORTFOLIO_ID}/9da8401b-7c1a-496d-b899-e7fbe2412f01/${apiPaths.MODE}/LOGO`,
      )
      .expect(404);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Not Found');
  });

  it('should retrieve an empty image gallery due to invalid portfolioEntryId', async () => {
    const response = await request(app.getHttpServer())
      .get(`${apiPaths.FILE_LINK}/9da8401b-7c1a-496d-b899-e7fbe2412f01/IMAGE`)
      .expect(200);
    const responseBody = response.body;
    expect(responseBody).toStrictEqual([]);
  });

  it('should successfully retrieve the logo for a valid portfolioEntryId', async () => {
    const response = await request(app.getHttpServer())
      .get(`${apiPaths.FILE_LINK}/2c4c5a70-fb36-422d-b105-22b80a0e1be7/LOGO`)
      .expect(200);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('objectKey');
    expect(responseBody).toHaveProperty('filename');
    expect(responseBody.filename).toBe('nemessis.png');
    expect(responseBody.objectKey).toBe('../assets/nemessis.png');
  });

  it('should successfully retrieve the image gallery for a valid portfolioEntryid', async () => {
    const response = await request(app.getHttpServer())
      .get(`${apiPaths.FILE_LINK}/2c4c5a70-fb36-422d-b105-22b80a0e1be7/IMAGE`)
      .expect(200);
    const responseBody = response.body;
    expect(responseBody.length).toBe(1);
    expect(responseBody[0]).toHaveProperty('objectKey');
    expect(responseBody[0]).toHaveProperty('filename');
    expect(responseBody[0].objectKey).toBe('../assets/vulkan.png');
    expect(responseBody[0].filename).toBe('vulkan.png');
  });

  it('should fail to create a Logo due to wrong portfolioId', async () => {
    const createFileLinkDto: CreateFileLinkDto = new CreateFileLinkDto({
      objectKey: '../test/object/key',
      filename: 'key.png',
      mode: FileLinkMode.LOGO,
      portfolioEntryId: '9da8401b-7c1a-496d-b899-e7fbe2412f01',
    });
    const response = await request(app.getHttpServer())
      .post(`${apiPaths.FILE_LINK}`)
      .set('Authorization', `Bearer ${token}`)
      .send(createFileLinkDto)
      .expect(404);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Not Found');
  });

  it('should fail to add an image to the gallery due to a wrong portfolioEntryId', async () => {
    const createFileLinkDto: CreateFileLinkDto = new CreateFileLinkDto({
      objectKey: '../test/object/key',
      filename: 'key.png',
      mode: FileLinkMode.IMAGE,
      portfolioEntryId: '9da8401b-7c1a-496d-b899-e7fbe2412f01',
    });
    const response = await request(app.getHttpServer())
      .post(`${apiPaths.FILE_LINK}`)
      .set('Authorization', `Bearer ${token}`)
      .send(createFileLinkDto)
      .expect(404);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Not Found');
  });

  it('should fail to add an image to the gallery due to a wrong portfolioEntryId', async () => {
    const createFileLinkDto: CreateFileLinkDto = new CreateFileLinkDto({
      objectKey: '../test/object/key',
      filename: 'key.png',
      mode: FileLinkMode.IMAGE,
      portfolioEntryId: '9da8401b-7c1a-496d-b899-e7fbe2412f01',
    });
    const response = await request(app.getHttpServer())
      .post(`${apiPaths.FILE_LINK}`)
      .set('Authorization', `Bearer ${token}`)
      .send(createFileLinkDto)
      .expect(404);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Not Found');
  });

  it('should create a logo successfully', async () => {
    const createFileLinkDto: CreateFileLinkDto = new CreateFileLinkDto({
      objectKey: '../test/object/key',
      filename: 'key.png',
      mode: FileLinkMode.LOGO,
      portfolioEntryId: '2c4c5a70-fb36-422d-b105-22b80a0e1be7',
    });
    const response = await request(app.getHttpServer())
      .post(`${apiPaths.FILE_LINK}`)
      .set('Authorization', `Bearer ${token}`)
      .send(createFileLinkDto)
      .expect(201);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('objectKey');
    expect(responseBody).toHaveProperty('filename');
    expect(responseBody.filename).toBe('key.png');
    expect(responseBody.objectKey).toBe('../test/object/key');
    objectKey = responseBody.objectKey;
  });

  it('should fail to delete a file link due to an invalid objectKey', async () => {
    const response = await request(app.getHttpServer())
      .delete(`${apiPaths.FILE_LINK_OBJECT_KEY}/aaa.jpeg`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Not Found');
  });
  it('should delete an already created fileLink with success', async () => {
    const response = await request(app.getHttpServer())
      .delete(
        `${apiPaths.FILE_LINK_OBJECT_KEY}/${encodeURIComponent(objectKey)}`,
      )
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const responseBody = response.body;
    expect(responseBody).toStrictEqual({});
  });
});
