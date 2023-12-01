import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {PortfolioEntryModule} from "./portofolio-entry/portfolio-entry.module";
import {FileLinkModule} from "./file-link/file-link.module";


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
export class AppModule {
}
