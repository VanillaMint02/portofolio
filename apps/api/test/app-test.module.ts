import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../src/modules/user/user.module";
import {AuthModule} from "../src/modules/auth/auth.module";
import {FileLinkModule} from "../src/modules/file-link/file-link.module";
import {PortfolioEntryModule} from "../src/modules/portofolio-entry/portfolio-entry.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: parseInt(configService.get('DATABASE_PORT'), 10),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                schema:configService.get("DATABASE_SCHEMA_TEST"),
                entities: [],
                synchronize: configService.get('PRODUCTION_FLAG') === 'false',
                autoLoadEntities: true,
            }),
            imports: [ConfigModule],
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        PortfolioEntryModule,
        FileLinkModule,

    ],
    controllers: [],
    providers: [],
})
export class AppTestModule {

}