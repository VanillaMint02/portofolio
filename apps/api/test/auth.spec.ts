import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppTestModule} from "./app-test.module";
import {AuthModule} from "../src/modules/auth/auth.module";
import {AuthService} from "../src/modules/auth/auth.service";
import {UserService} from "../src/modules/user/user.service";
import {UserModule} from "../src/modules/user/user.module";
import * as request from 'supertest';
import {JwtService} from "@nestjs/jwt";

describe("AuthController e2e",()=>{
    let app:INestApplication;

    beforeEach(async()=>{
        const moduleFixture:TestingModule=await Test.createTestingModule({
            imports:[AppTestModule,AuthModule,UserModule],
            providers:[AuthService,UserService,JwtService]
        }).compile();
        app=moduleFixture.createNestApplication();
        await app.init();
    })
    afterAll(async () => {
        await app.close();
    });

    it ('should fail to login an user', async()=>{
        return request(app.getHttpServer())
            .get('/api/auth/login')
            .expect(401);
    })
})