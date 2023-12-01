import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FileLinkDomain} from "./domain/file-link.domain";
import {Repository} from "typeorm";
import {PortfolioEntryService} from "../portofolio-entry/portfolio-entry.service";
import {FileLinkDto} from "./dto/file-link.dto";
import {FileLinkMapper} from "./mapper/file-link.mapper";
import {CreateFileLinkDto} from "./dto/create-file-link.dto";
import {PortfolioEntryMapper} from "../portofolio-entry/mappers/portfolio-entry.mapper";
import {FileLinkMode} from "./domain/file-link.mode";

@Injectable()
export class FileLinkService {
    constructor(
        @InjectRepository(FileLinkDomain)
        private fileLinkRepository: Repository<FileLinkDomain>,
        private portfolioEntryService: PortfolioEntryService,
    ) {
    }

    private validateFileLinkMode(mode: FileLinkMode): void {
        if (!Object.values(FileLinkMode).includes(mode)) {
            throw new BadRequestException();
        }
    }
    private async getFileLinkForLogo(portfolioEntryId: string): Promise<FileLinkDto> {
        const foundFileLink = await this.fileLinkRepository.findOne({
            where: {portfolio: {id: portfolioEntryId}},
            relations: ['portfolio']
        });
        if (!foundFileLink) {
            throw new BadRequestException();
        }
        return FileLinkMapper.mapToDto(foundFileLink);
    }

    private async getFileLinksForImageGallery(portfolioEntryId: string): Promise<FileLinkDto[]> {
        const foundFileLinks = await this.fileLinkRepository.find({
            where: {parent: {id: portfolioEntryId}},
            relations: ['parent']
        });
        if (!foundFileLinks) {
            return [];
        }
        return foundFileLinks.map(fileLink => FileLinkMapper.mapToDto(fileLink));
    }
    async getFileLinkForPortfolioId(portfolioEntryId: string, mode: FileLinkMode): Promise<FileLinkDto | FileLinkDto[]> {
        this.validateFileLinkMode(mode);
        if (mode === "LOGO") {
            return await this.getFileLinkForLogo(portfolioEntryId);
        } else if (mode === "IMAGE") {
            return await this.getFileLinksForImageGallery(portfolioEntryId);
        }
    }

    async createLogo(createFileLinkDto: CreateFileLinkDto): Promise<FileLinkDto> {
        this.validateFileLinkMode(createFileLinkDto.mode);
        const foundPortfolioEntryDto = await this.portfolioEntryService.findOneById(createFileLinkDto.portfolioEntryId);
        const portfolioEntry = PortfolioEntryMapper.mapToDomain(foundPortfolioEntryDto)
        try {
            const savedFileLink = FileLinkMapper.mapCreateFileLinkDtoToDomain(createFileLinkDto, portfolioEntry, createFileLinkDto.mode);
            await this.fileLinkRepository.save(savedFileLink);
            return FileLinkMapper.mapToDto(savedFileLink);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async deleteFileLink(id: string): Promise<void> {
        const deleteResult = await this.fileLinkRepository.delete({id});
        if (deleteResult.affected === 0) {
            throw new BadRequestException();
        }
    }




}