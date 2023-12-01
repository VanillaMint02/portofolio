import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../src/modules/user/user.module";
import {AuthModule} from "../src/modules/auth/auth.module";
import {FileLinkModule} from "../src/modules/file-link/file-link.module";
import {PortfolioEntryModule} from "../src/modules/portofolio-entry/portfolio-entry.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'sqlite',
                database: configService.get('TEST_DATABASE_NAME'),
                entities: [],
                synchronize: configService.get('PRODUCTION_FLAG') === 'false',
                autoLoadEntities: configService.get('PRODUCTION_FLAG') === 'false',
                migrationsRun: true,
            }),
            imports: [ConfigModule],
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        FileLinkModule,
        PortfolioEntryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppTestModule{

}