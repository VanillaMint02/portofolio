import { CreatePortfolioEntryDto } from '../dto/create-portfolio-entry.dto';
import { PortfolioEntryDomain } from '../domain/portfolio-entry.domain';
import { PortfolioEntryDto } from '../dto/portfolio-entry.dto';

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
}
