import {ApiTags} from "@nestjs/swagger";

import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {FileLinkConfig} from "./file-link.config";
import {FileLinkDto} from "./dto/file-link.dto";
import {FileLinkService} from "./file-link.service";
import {CreateFileLinkDto} from "./dto/create-file-link.dto";
import {FileLinkMode} from "./domain/file-link.mode";


@ApiTags(FileLinkConfig.SWAGGER_FEATURE)
@Controller(FileLinkConfig.API_ROUTE)
export class FileLinkController {
    constructor(private fileLinkService: FileLinkService) {
    }

    @Get(':portfolioEntryId/:mode')
    async getLogoForPortfolioEntryId(@Param('portfolioEntryId') portfolioId: string, @Param('mode') mode: FileLinkMode): Promise<FileLinkDto | FileLinkDto[]> {
        return await this.fileLinkService.getFileLinkForPortfolioId(portfolioId, mode);
    }

    @Post()
    async createFileLink(@Body() createFileLink: CreateFileLinkDto): Promise<FileLinkDto> {
        return await this.fileLinkService.createLogo(createFileLink);

    }

    @Delete('objectKey/:objectKey')
    async deleteFileLink(@Param('objectKey') objectKey: string): Promise<void> {
        return await this.fileLinkService.deleteFileLink(objectKey);
    }
}