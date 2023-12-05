import { ApiProperty } from '@nestjs/swagger';

export class CreatePortfolioEntryDto {
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
    description: 'The id of the person who owns the entry',
    example: 'The randomly generated id that the owner has',
    required: true,
  })
  ownerId: string;
  @ApiProperty({
    description: 'The link which redirects to the customer webpage',
    example: 'https://github.com',
    required: true,
  })
  customerLink: string;

  constructor(values: Partial<CreatePortfolioEntryDto>) {
    if (values) {
      this.customerLink = values.customerLink;
      this.title = values.title;
      this.description = values.description;
      this.ownerId = values.ownerId;
    }
  }
}
