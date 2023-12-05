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

@Injectable()
export class PortfolioEntryService {
  constructor(
    @InjectRepository(PortfolioEntryDomain)
    private portfolioEntryRepository: Repository<PortfolioEntryDomain>,
    private userService: UserService,
  ) {}

  async findOneById(portfolioEntryId: string): Promise<PortfolioEntryDto> {
    const foundModel = await this.readOneById(portfolioEntryId);
    return PortfolioEntryMapper.mapToDto(foundModel);
  }

  async getAllPublishedPortfolioEntries(): Promise<PortfolioEntryDto[]> {
    const foundModels = await this.portfolioEntryRepository.find({
      where: {
        status: PortfolioEntryStatus.PUBLISHED,
      },
      relations: ['user'],
    });
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => PortfolioEntryMapper.mapToDto(model));
  }

  async getAllPortfolioEntries(): Promise<PortfolioEntryDto[]> {
    const foundModels = await this.portfolioEntryRepository.find({
      relations: ['user'],
    });
    if (!foundModels) {
      return [];
    }
    return foundModels.map((model) => PortfolioEntryMapper.mapToDto(model));
  }

  async createPortfolioEntry(
    createPortfolioEntryDto: CreatePortfolioEntryDto,
  ): Promise<PortfolioEntryDto> {
    const foundUserModel = await this.userService.getUserById(
      createPortfolioEntryDto.ownerId,
    );
    if (!foundUserModel) {
      throw new BadRequestException();
    }
    try {
      const portfolioEntryDomain =
        PortfolioEntryMapper.mapCreatePortfolioEntryToDomain(
          createPortfolioEntryDto,
        );
      portfolioEntryDomain.user = UserMapper.mapToDomain(foundUserModel);
      const savedPortfolioEntryDomain =
        await this.portfolioEntryRepository.save(portfolioEntryDomain);
      return PortfolioEntryMapper.mapToDto(savedPortfolioEntryDomain);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updatePortfolioEntry(
    portfolioEntryDto: PortfolioEntryDto,
  ): Promise<PortfolioEntryDto> {
    this.validatePortfolioStatus(portfolioEntryDto.status);
    await this.findOneById(portfolioEntryDto.id);
    const savedPortfolioEntry =
      PortfolioEntryMapper.mapToDomain(portfolioEntryDto);
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
    const foundModel = await this.portfolioEntryRepository.findOneBy({
      id: portfolioEntryId,
    });
    if (!foundModel) {
      throw new NotFoundException();
    }
    return foundModel;
  }
}
