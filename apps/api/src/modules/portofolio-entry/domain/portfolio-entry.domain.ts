import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileLinkDomain } from '../../file-link/domain/file-link.domain';
import { PortfolioEntryStatus } from './portfolio-entry-status';
import { UserDomain } from '../../user/domain/user.domain';

@Entity()
export class PortfolioEntryDomain {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  customerLink: string;

  @ManyToOne(() => UserDomain, (user) => user.portfolioEntries, {
    cascade: true,
    nullable: false,
    lazy: true,
  })
  user: UserDomain;

  @OneToOne(() => FileLinkDomain, (logo) => logo.portfolio, {})
  logo?: FileLinkDomain;

  @OneToMany(() => FileLinkDomain, (childFileLink) => childFileLink.parent, {})
  imageGallery?: FileLinkDomain[];

  @Column({
    nullable: false,
    enum: PortfolioEntryStatus,
    type: 'enum',
    default: PortfolioEntryStatus.PUBLISHED,
  })
  status?: PortfolioEntryStatus;

  constructor(values: Partial<PortfolioEntryDomain>) {
    if (values) {
      this.id = values.id;
      this.title = values.title;
      this.description = values.description;
      this.customerLink = values.customerLink;
      this.user = values.user;
      this.status = values.status;
    }
  }
}
