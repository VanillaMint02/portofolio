import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,} from "typeorm";
import {PortfolioEntryDomain} from "../../portofolio-entry/domain/portfolio-entry.domain";

@Entity()
export class FileLinkDomain {

    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({nullable: false})
    objectKey: string;

    @Column({nullable: false})
    filename: string;
    @OneToOne(() => PortfolioEntryDomain, (portfolio) => portfolio.logo, {
        nullable: true,
        cascade: true,
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    @JoinColumn({name: 'portfolioId'})
    portfolio: PortfolioEntryDomain;
    @ManyToOne(() => PortfolioEntryDomain, (parent) => parent.imageGallery, {
        nullable: true,
        cascade: true,
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    parent: PortfolioEntryDomain;

    constructor(values: Partial<FileLinkDomain>) {
        if (values) {
            this.id = values.id;
            this.objectKey = values.objectKey;
            this.filename = values.filename;
            this.parent = values.parent;
            this.portfolio = values.portfolio;
        }
    }
}