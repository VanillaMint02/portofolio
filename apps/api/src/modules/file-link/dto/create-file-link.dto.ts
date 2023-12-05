import { ApiProperty } from '@nestjs/swagger';
import { FileLinkMode } from '../domain/file-link.mode';

export class CreateFileLinkDto {
  @ApiProperty({
    description: 'The key of the file link',
    example: '../assets/atlas.png',
    required: true,
  })
  objectKey: string;
  @ApiProperty({
    description: 'The name of the file',
    example: 'atlas.png',
    required: true,
  })
  filename: string;
  @ApiProperty({
    description: 'The id of the portfolio entry owning this file',
    example: 'a random uuid',
    required: true,
  })
  portfolioEntryId: string;

  constructor(values: Partial<CreateFileLinkDto>) {
    if (values) {
      this.objectKey = values.objectKey;
      this.filename = values.filename;
      this.portfolioEntryId = values.portfolioEntryId;
    }
  }
}
