import { CreatePortfolioEntryDto } from '../dto/create-portfolio-entry.dto';
import { PortfolioEntryDomain } from '../domain/portfolio-entry.domain';
import { PortfolioEntryDto } from '../dto/portfolio-entry.dto';
import { FileLinkMapper } from '../../file-link/mapper/file-link.mapper';
import { UpdatePortfolioEntryDto } from '../dto/update-portfolio-entry.dto';
import { FileLinkDto } from '../../file-link/dto/file-link.dto';

export class PortfolioEntryMapper {
  static mapCreatePortfolioEntryToDomain(
    createPortfolioEntryDto: CreatePortfolioEntryDto,
  ): PortfolioEntryDomain {
    return new PortfolioEntryDomain({
      id: undefined,
      title: createPortfolioEntryDto.title,
      description: createPortfolioEntryDto.description,
      customerLink: createPortfolioEntryDto.customerLink,
      status: undefined,
    });
  }

  static mapToDto(
    portfolioEntryDomain: PortfolioEntryDomain,
  ): PortfolioEntryDto {
    return new PortfolioEntryDto({
      id: portfolioEntryDomain.id,
      title: portfolioEntryDomain.title,
      description: portfolioEntryDomain.description,
      customerLink: portfolioEntryDomain.customerLink,
      status: portfolioEntryDomain.status,
      imageGallery: portfolioEntryDomain.imageGallery.map((fileLinkDto) =>
        FileLinkMapper.mapToDto(fileLinkDto),
      ),
      logo: portfolioEntryDomain.logo,
    });
  }

  static mapToDomain(
    portfolioEntryDto: PortfolioEntryDto,
  ): PortfolioEntryDomain {
    return new PortfolioEntryDomain({
      id: portfolioEntryDto.id,
      title: portfolioEntryDto.title,
      description: portfolioEntryDto.description,
      customerLink: portfolioEntryDto.customerLink,
      status: portfolioEntryDto.status,
    });
  }

  static mapUpdatePortfolioEntryDtoToDomain(
    updatePortfolioEntryDto: UpdatePortfolioEntryDto,
  ) {
    return new PortfolioEntryDomain({
      id: updatePortfolioEntryDto.id,
      title: updatePortfolioEntryDto.title,
      description: updatePortfolioEntryDto.description,
      customerLink: updatePortfolioEntryDto.customerLink,
      status: updatePortfolioEntryDto.status,
      logo: FileLinkMapper.mapCreateFileLinkDtoToDomain(
        updatePortfolioEntryDto.logo,
      ),
      imageGallery: updatePortfolioEntryDto.imageGallery.map((fileLink) =>
        FileLinkMapper.mapCreateFileLinkDtoToDomain(fileLink),
      ),
    });
  }
}
