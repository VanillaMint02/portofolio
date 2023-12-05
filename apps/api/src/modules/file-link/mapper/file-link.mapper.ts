import { FileLinkDomain } from '../domain/file-link.domain';
import { FileLinkDto } from '../dto/file-link.dto';
import { CreateFileLinkDto } from '../dto/create-file-link.dto';
import { PortfolioEntryDomain } from '../../portofolio-entry/domain/portfolio-entry.domain';
import { FileLinkMode } from '../domain/file-link.mode';

export class FileLinkMapper {
  static mapToDto(fileLinkDomain: FileLinkDomain): FileLinkDto {
    return new FileLinkDto({
      objectKey: fileLinkDomain.objectKey,
      filename: fileLinkDomain.filename,
    });
  }

  static mapToDomain(fileLinkDto: FileLinkDto): FileLinkDomain {
    return new FileLinkDomain({
      objectKey: fileLinkDto.objectKey,
      filename: fileLinkDto.filename,
    });
  }

  static mapCreateFileLinkDtoToDomain(
    createFileLinkDto: CreateFileLinkDto,
    portfolio: PortfolioEntryDomain,
    mode: FileLinkMode,
  ): FileLinkDomain {
    if (mode === FileLinkMode.LOGO) {
      return new FileLinkDomain({
        objectKey: createFileLinkDto.objectKey,
        filename: createFileLinkDto.filename,
        parent: null,
        portfolio,
      });
    } else if (mode === FileLinkMode.IMAGE) {
      return new FileLinkDomain({
        objectKey: createFileLinkDto.objectKey,
        filename: createFileLinkDto.filename,
        parent: portfolio,
        portfolio: null,
      });
    }
  }
}
