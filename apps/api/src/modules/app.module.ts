import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioEntryModule } from './portofolio-entry/portfolio-entry.module';
import { FileLinkModule } from './file-link/file-link.module';
import { MulterConfiguration } from '../utils/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        autoLoadEntities: true,
        migrations: ['dist/migrations/*{.ts,.js}'],
        migrationsRun: false,
        logging: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MulterModule.register(MulterConfiguration(process.env.UPDATE_FILE_PATH)),
    UserModule,
    AuthModule,
    PortfolioEntryModule,
    FileLinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
