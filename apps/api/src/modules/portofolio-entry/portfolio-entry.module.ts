import { PortfolioEntryDomain } from './domain/portfolio-entry.domain';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntryController } from './portfolio-entry.controller';
import { PortfolioEntryService } from './portfolio-entry.service';
import { UserService } from '../user/user.service';
import { Module } from '@nestjs/common';
import { FileLinkService } from '../file-link/file-link.service';
import { FileLinkDomain } from '../file-link/domain/file-link.domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntryDomain, FileLinkDomain]),
    UserModule,
  ],
  controllers: [PortfolioEntryController],
  providers: [PortfolioEntryService, UserService, FileLinkService],
  exports: [PortfolioEntryService, TypeOrmModule],
})
export class PortfolioEntryModule {}
