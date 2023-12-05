import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { UserConfig } from './modules/user/user.config';
import { AuthConfig } from './modules/auth/auth.config';
import { PortfolioEntryConfig } from './modules/portofolio-entry/portfolio-entry.config';
import { FileLinkConfig } from './modules/file-link/file-link.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const version = '1.0';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Port-o-maticAPI')
    .setDescription('The Api for portfolio management')
    .addTag(UserConfig.SWAGGER_FEATURE)
    .addTag(AuthConfig.SWAGGER_FEATURE)
    .addTag(PortfolioEntryConfig.SWAGGER_FEATURE)
    .addTag(FileLinkConfig.SWAGGER_FEATURE)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
