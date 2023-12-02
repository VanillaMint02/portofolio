import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../src/modules/user/user.module";
import {AuthModule} from "../src/modules/auth/auth.module";
import {FileLinkModule} from "../src/modules/file-link/file-link.module";
import {PortfolioEntryModule} from "../src/modules/portofolio-entry/portfolio-entry.module";
import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());
export const dataSourceOptions: DataSourceOptions = ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: true,
});

export default new DataSource(dataSourceOptions);

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
                autoLoadEntities: configService.get('PRODUCTION_FLAG') === 'false',
                runMigrations: true,
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
export class AppTestModule {

}