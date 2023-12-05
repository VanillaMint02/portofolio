import { ApiProperty } from '@nestjs/swagger';

export class FileLinkDto {
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

  constructor(values: Partial<FileLinkDto>) {
    if (values) {
      this.filename = values.filename;
      this.objectKey = values.objectKey;
    }
  }
}
