import { ApiProperty } from '@nestjs/swagger';
import { PortfolioEntryStatus } from '../domain/portfolio-entry-status';
import { CreateFileLinkDto } from '../../file-link/dto/create-file-link.dto';

export class UpdatePortfolioEntryDto {
  @ApiProperty({
    description: 'Automatically generated, its the ID of the portfolio entry',
    example: 'A string that is going to be automatically generated',
    required: true,
  })
  id: string;
  @ApiProperty({
    description: 'The title of the portfolio entry',
    example: 'Aquarium',
    required: true,
  })
  title: string;
  @ApiProperty({
    description: 'The description of the portfolio entry',
    example: 'A project that describes an aquarium',
    required: true,
  })
  description: string;
  @ApiProperty({
    description: 'The person who owns this entry',
    example: "The digital worker's account",
    required: true,
  })
  customerLink: string;
  @ApiProperty({
    description: 'The status of the portfolio entry',
    example: 'HIDDEN',
    required: true,
  })
  status: PortfolioEntryStatus;
  @ApiProperty({
    description: 'The logo of this portfolio entry',
    example: '{"objectKey":"assets","filename":"alhambra.png","mode":"IMAGE"}',
    required: true,
  })
  logo: CreateFileLinkDto;
  @ApiProperty({
    description: 'An array of images ready to be saved in the gallery',
    example:
      '[{"objectKey":"assets","filename":"alhambra.png","mode":"IMAGE"},{"objectKey":"assets","filename":"alhambra.png","mode":"IMAGE"}]',
  })
  imageGallery: CreateFileLinkDto[];

  constructor(values: Partial<UpdatePortfolioEntryDto>) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.description = values.description;
      this.customerLink = values.customerLink;
      this.logo = values.logo;
      this.imageGallery = values.imageGallery;
    }
  }
}
