import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileLinkDomain } from './domain/file-link.domain';
import { Repository } from 'typeorm';
import { PortfolioEntryService } from '../portofolio-entry/portfolio-entry.service';
import { FileLinkDto } from './dto/file-link.dto';
import { FileLinkMapper } from './mapper/file-link.mapper';
import { CreateFileLinkDto } from './dto/create-file-link.dto';
import { PortfolioEntryMapper } from '../portofolio-entry/mappers/portfolio-entry.mapper';
import { FileLinkMode } from './domain/file-link.mode';

@Injectable()
export class FileLinkService {
  constructor(
    @InjectRepository(FileLinkDomain)
    private fileLinkRepository: Repository<FileLinkDomain>,
  ) {}

  async getFileLinkForPortfolioId(
    portfolioEntryId: string,
    mode: FileLinkMode,
  ): Promise<FileLinkDto | FileLinkDto[]> {
    this.validateFileLinkMode(mode);
    if (mode === 'LOGO') {
      return await this.getFileLinkForLogo(portfolioEntryId);
    } else if (mode === 'IMAGE') {
      return await this.getFileLinksForImageGallery(portfolioEntryId);
    }
  }

  async createFileLink(
    createFileLinkDto: CreateFileLinkDto,
    mode: FileLinkMode,
  ): Promise<FileLinkDto> {
    try {
      this.validateFileLinkMode(mode);
      const savedFileLink =
        FileLinkMapper.mapCreateFileLinkDtoToDomain(createFileLinkDto);
      if (mode === 'LOGO') {
        savedFileLink.portfolio.id = createFileLinkDto.portfolioEntryId;
      } else {
        savedFileLink.parent.id = createFileLinkDto.portfolioEntryId;
      }
      await this.fileLinkRepository.save(savedFileLink);
      return FileLinkMapper.mapToDto(savedFileLink);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteFileLink(objectKey: string): Promise<void> {
    const deleteResult = await this.fileLinkRepository.delete({ objectKey });
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }

  private validateFileLinkMode(mode: FileLinkMode): void {
    if (!Object.values(FileLinkMode).includes(mode)) {
      throw new BadRequestException();
    }
  }
  public async readOneByPortfolioEntryId(
    portfolioEntryId: string,
  ): Promise<FileLinkDomain> {
    const foundFileLink = await this.fileLinkRepository.findOne({
      where: { portfolio: { id: portfolioEntryId } },
      relations: ['portfolio'],
    });
    if (!foundFileLink) {
      return null;
    }
    return foundFileLink;
  }
  public async getFileLinkForLogo(
    portfolioEntryId: string,
  ): Promise<FileLinkDto> {
    const foundFileLink =
      await this.readOneByPortfolioEntryId(portfolioEntryId);
    if (!foundFileLink) {
      throw new NotFoundException();
    }
    return FileLinkMapper.mapToDto(foundFileLink);
  }

  private async getFileLinksForImageGallery(
    portfolioEntryId: string,
  ): Promise<FileLinkDto[]> {
    const foundFileLinks = await this.fileLinkRepository.find({
      where: { parent: { id: portfolioEntryId } },
      relations: ['parent'],
    });
    if (!foundFileLinks) {
      return [];
    }
    return foundFileLinks.map((fileLink) => FileLinkMapper.mapToDto(fileLink));
  }
}
