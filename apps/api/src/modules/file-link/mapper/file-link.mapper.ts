import { FileLinkDomain } from '../domain/file-link.domain';
import { FileLinkDto } from '../dto/file-link.dto';
import { CreateFileLinkDto } from '../dto/create-file-link.dto';

export class FileLinkMapper {
  static mapToDto(fileLinkDomain: FileLinkDomain): FileLinkDto {
    if (fileLinkDomain) {
      return new FileLinkDto({
        objectKey: fileLinkDomain.objectKey,
        filename: fileLinkDomain.filename,
      });
    }
  }

  static mapCreateFileLinkDtoToDomain(
    createFileLinkDto: CreateFileLinkDto,
  ): FileLinkDomain {
    {
      return new FileLinkDomain({
        objectKey: createFileLinkDto.objectKey,
        filename: createFileLinkDto.filename,
      });
    }
  }
}
