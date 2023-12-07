import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntryDomain } from './domain/portfolio-entry.domain';
import { Repository } from 'typeorm';
import { PortfolioEntryDto } from './dto/portfolio-entry.dto';
import { PortfolioEntryMapper } from './mappers/portfolio-entry.mapper';
import { PortfolioEntryStatus } from './domain/portfolio-entry-status';
import { CreatePortfolioEntryDto } from './dto/create-portfolio-entry.dto';
import { UserService } from '../user/user.service';
import { UserMapper } from '../user/mappers/user.mapper';
import { UpdatePortfolioEntryDto } from './dto/update-portfolio-entry.dto';
import { FileLinkService } from '../file-link/file-link.service';
import { FileLinkMode } from '../file-link/domain/file-link.mode';

@Injectable()
export class PortfolioEntryService {
  constructor(
    @InjectRepository(PortfolioEntryDomain)
    private portfolioEntryRepository: Repository<PortfolioEntryDomain>,
    private userService: UserService,
    private fileLinkService: FileLinkService,
  ) {}

  async findOneById(portfolioEntryId: string): Promise<PortfolioEntryDto> {
    const foundModel = await this.readOneById(portfolioEntryId);
    return PortfolioEntryMapper.mapToDto(foundModel);
  }
  private async addLogosToModels(
    models: PortfolioEntryDomain[],
  ): Promise<PortfolioEntryDomain[]> {
    for (const model of models) {
      const logo = await this.fileLinkService.readOneByPortfolioEntryId(
        model.id,
      );
      if (!logo) {
        model.logo = null;
      } else model.logo = logo;
    }
    return models;
  }
  async getAllPublishedPortfolioEntries(): Promise<PortfolioEntryDto[]> {
    const foundModels = await this.portfolioEntryRepository.find({
      where: {
        status: PortfolioEntryStatus.PUBLISHED,
      },
      relations: ['user', 'imageGallery'],
    });

    if (!foundModels) {
      return [];
    }
    const mappedModels = await this.addLogosToModels(foundModels);
    return mappedModels.map((model) => PortfolioEntryMapper.mapToDto(model));
  }

  async getAllPortfolioEntries(): Promise<PortfolioEntryDto[]> {
    const foundModels = await this.portfolioEntryRepository.find({
      relations: ['user', 'imageGallery'],
    });
    if (!foundModels) {
      return [];
    }
    const mappedModels = await this.addLogosToModels(foundModels);
    return mappedModels.map((model) => PortfolioEntryMapper.mapToDto(model));
  }

  async createPortfolioEntry(
    createPortfolioEntryDto: CreatePortfolioEntryDto,
  ): Promise<PortfolioEntryDto> {
    const foundUserModel = await this.userService.getUserById(
      createPortfolioEntryDto.ownerId,
    );
    if (!foundUserModel) {
      throw new NotFoundException();
    }
    try {
      const portfolioEntryDomain =
        PortfolioEntryMapper.mapCreatePortfolioEntryToDomain(
          createPortfolioEntryDto,
        );
      portfolioEntryDomain.user = UserMapper.mapToDomain(foundUserModel);
      portfolioEntryDomain.logo = null;
      portfolioEntryDomain.imageGallery = [];
      const savedPortfolioEntryDomain =
        await this.portfolioEntryRepository.save(portfolioEntryDomain);
      return PortfolioEntryMapper.mapToDto(savedPortfolioEntryDomain);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updatePortfolioEntry(
    updatePortfolioEntryDto: UpdatePortfolioEntryDto,
  ): Promise<PortfolioEntryDto> {
    this.validatePortfolioStatus(updatePortfolioEntryDto.status);
    await this.readOneById(updatePortfolioEntryDto.id);
    const savedPortfolioEntry =
      PortfolioEntryMapper.mapUpdatePortfolioEntryDtoToDomain(
        updatePortfolioEntryDto,
      );
    for (const image of updatePortfolioEntryDto.imageGallery) {
      await this.fileLinkService.createFileLink(image, FileLinkMode.IMAGE);
    }
    await this.fileLinkService.createFileLink(
      updatePortfolioEntryDto.logo,
      FileLinkMode.LOGO,
    );
    for (const image of updatePortfolioEntryDto.imageGallery) {
      await this.fileLinkService.createFileLink(image, FileLinkMode.IMAGE);
    }
    await this.portfolioEntryRepository.save(savedPortfolioEntry);
    return PortfolioEntryMapper.mapToDto(savedPortfolioEntry);
  }

  async deletePortfolioEntry(id: string) {
    const deleteResult = await this.portfolioEntryRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new BadRequestException();
    }
  }

  private validatePortfolioStatus(status: PortfolioEntryStatus): void {
    if (!Object.values(PortfolioEntryStatus).includes(status)) {
      throw new BadRequestException();
    }
  }

  private async readOneById(
    portfolioEntryId: string,
  ): Promise<PortfolioEntryDomain> {
    const foundModel = await this.portfolioEntryRepository.findOne({
      where: { id: portfolioEntryId },
      relations: ['user', 'imageGallery'],
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
}
