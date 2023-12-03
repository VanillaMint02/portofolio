import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {PortfolioEntryModule} from "./portofolio-entry/portfolio-entry.module";
import {FileLinkModule} from "./file-link/file-link.module";
import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());
export const dataSourceOptions:DataSourceOptions=({
    type:'postgres',
    host:process.env.DATABASE_HOST,
    port:parseInt(process.env.DATABASE_PORT),
    username:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    migrations:['dist/migrations/*{.ts,.js}'],
    migrationsRun:true,
    synchronize:true,
});

export default new DataSource(dataSourceOptions);
@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true,}),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: parseInt(configService.get('DATABASE_PORT'), 10),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                entities: [],
                synchronize: false,
                autoLoadEntities: configService.get('PRODUCTION_FLAG') === 'false',
                migrations:['dist/migrations/*{.ts,.js}'],
                migrationsRun:false,
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
export class AppModule {
}

