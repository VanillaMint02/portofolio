import { PortfolioEntryDomain } from './domain/portfolio-entry.domain';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntryController } from './portfolio-entry.controller';
import { PortfolioEntryService } from './portfolio-entry.service';
import { UserService } from '../user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntryDomain]), UserModule],
  controllers: [PortfolioEntryController],
  providers: [PortfolioEntryService, UserService],
  exports: [PortfolioEntryService, TypeOrmModule],
})
export class PortfolioEntryModule {}
