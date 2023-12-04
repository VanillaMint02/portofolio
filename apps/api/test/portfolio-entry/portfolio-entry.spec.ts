import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import * as request from 'supertest';
import {PortfolioEntryService} from "../src/modules/portofolio-entry/portfolio-entry.service";
import {PortfolioEntryModule} from "../src/modules/portofolio-entry/portfolio-entry.module";
import {CreatePortfolioEntryDto} from "../src/modules/portofolio-entry/dto/create-portfolio-entry.dto";
import {AppTestModule} from "./app-test.module";
import {UserService} from "../src/modules/user/user.service";
import {UserModule} from "../src/modules/user/user.module";
import {AuthModule} from "../src/modules/auth/auth.module";
import {JwtService} from "@nestjs/jwt";
import {PortfolioEntryDto} from "../src/modules/portofolio-entry/dto/portfolio-entry.dto";
import {PortfolioEntryStatus} from "../src/modules/portofolio-entry/domain/portfolio-entry-status";

describe("PortfolioEntryController e2e", () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token: string;
    let portfolioEntryId:string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppTestModule, UserModule, PortfolioEntryModule, AuthModule],
            providers: [UserService, PortfolioEntryService]
        })
            .compile();
        app = moduleFixture.createNestApplication();
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        await app.init();
        jwtService = moduleFixture.get<JwtService>(JwtService);
        token = jwtService.sign({
            email: 'example@example.com',
            sub: '9da8401b-7c1a-496d-b899-e7fbe2412f01',
        });
    })
    afterAll(async () => {
        await app.close();
    });

    it('should create a portfolio entry successfully', async () => {
        const createPortfolioEntryDto: CreatePortfolioEntryDto = new CreatePortfolioEntryDto({
            title: 'TestProject',
            description: 'A testing project meant for this e2e test',
            customerLink: 'No customer link, since it is a tested project',
        });

        const response = await request(app.getHttpServer())
            .post('/api/portfolio')
            .set('Authorization', `Bearer ${token}`)
            .send(createPortfolioEntryDto)
            .expect(201);
        const responseBody=response.body;
        expect(responseBody).toHaveProperty('title');
        expect(responseBody).toHaveProperty('description');
        expect(responseBody).toHaveProperty('customerLink');
        expect (responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('status');
        expect(responseBody.status).toBeDefined();
        expect(responseBody.id).toBeDefined();
        expect(responseBody.status).toBe("PUBLISHED");
        portfolioEntryId=responseBody.id;
    })
    it('should edit an already published portfolio entry', async()=>{

        const portfolioEntryDto:PortfolioEntryDto=new PortfolioEntryDto({
            id:portfolioEntryId,
            title:'Insaniquarium',
            description:"An aquarium of insane species",
            status:PortfolioEntryStatus.HIDDEN,
        })
        const response=await request(app.getHttpServer())
            .put('/api/portfolio')
            .set('Authorization', `Bearer ${token}`)
            .send(portfolioEntryDto)
            .expect(200);
        const responseBody=response.body;
    })

    it('should get all published portfolio entries', async () => {
        const response= await request(app.getHttpServer())
            .get('/api/portfolio/published')
            .expect(200);
        const responseBody=response.body;
        expect(responseBody.length).toBe(1);
    })



    it('should get all portfolio entries', async () => {
        const response= await request(app.getHttpServer())
            .get('/api/portfolio')
            .expect(200);
        const responseBody=response.body;
        expect(responseBody.length).toBe(2);
    })

    it('should fail to delete a portfolio entry', async () => {
        return request(app.getHttpServer())
            .delete('/api/portfolio/portfolioEntryId/42e27ee0-eb2f-481a-97dd-73120784942e')
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    })

    it('should delete a portfolio entry successfully', async () => {
        const response= await request(app.getHttpServer())
            .delete(`/api/portfolio/portfolioEntryId/${portfolioEntryId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        const responseBody=response.body;
        expect(responseBody).toStrictEqual({});
    })
})