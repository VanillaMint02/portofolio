import { PortfolioEntryConfig } from './portfolio-entry.config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PortfolioEntryService } from './portfolio-entry.service';
import { PortfolioEntryDto } from './dto/portfolio-entry.dto';
import { CreatePortfolioEntryDto } from './dto/create-portfolio-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags(PortfolioEntryConfig.SWAGGER_FEATURE)
@Controller(PortfolioEntryConfig.API_ROUTE)
export class PortfolioEntryController {
  constructor(private portfolioEntryService: PortfolioEntryService) {}

  @Get('published')
  async getAllPublishedPortfolioEntries(): Promise<PortfolioEntryDto[]> {
    return await this.portfolioEntryService.getAllPublishedPortfolioEntries();
  }

  @Get()
  async getAllPortfolioEntries(): Promise<PortfolioEntryDto[]> {
    return await this.portfolioEntryService.getAllPortfolioEntries();
  }

  @Get('portfolioEntryId/:portfolioEntryId')
  async getOnePortfolioEntryById(
    @Param('portfolioEntryId') id: string,
  ): Promise<PortfolioEntryDto> {
    return await this.portfolioEntryService.findOneById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPortfolioEntry(
    @Body() createPortfolioEntryDto: CreatePortfolioEntryDto,
  ): Promise<PortfolioEntryDto> {
    return await this.portfolioEntryService.createPortfolioEntry(
      createPortfolioEntryDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('portfolioEntryId/:portfolioEntryId')
  async deletePortfolioEntry(
    @Param('portfolioEntryId') id: string,
  ): Promise<void> {
    await this.portfolioEntryService.deletePortfolioEntry(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updatePortfolioEntry(
    @Body() portfolioEntryDto: PortfolioEntryDto,
  ): Promise<PortfolioEntryDto> {
    return await this.portfolioEntryService.updatePortfolioEntry(
      portfolioEntryDto,
    );
  }
}
