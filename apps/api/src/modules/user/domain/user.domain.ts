import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-roles';
import { PortfolioEntryDomain } from '../../portofolio-entry/domain/portfolio-entry.domain';

@Entity()
export class UserDomain {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, enum: UserRole, type: 'enum', default: 'ADMIN' })
  role: UserRole;
  @OneToMany(
    () => PortfolioEntryDomain,
    (portfolioEntryDomain) => portfolioEntryDomain.user,
  )
  portfolioEntries?: PortfolioEntryDomain[];

  constructor(values: Partial<UserDomain>) {
    if (values) {
      this.id = values.id;
      this.email = values.email;
      this.name = values.name;
      this.password = values.password;
    }
  }
}
