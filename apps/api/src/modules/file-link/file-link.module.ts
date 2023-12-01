import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PortfolioEntryDomain} from "../portofolio-entry/domain/portfolio-entry.domain";
import {UserModule} from "../user/user.module";
import {FileLinkDomain} from "./domain/file-link.domain";
import {FileLinkService} from "./file-link.service";
import {FileLinkController} from "./file-link.controller";
import {PortfolioEntryService} from "../portofolio-entry/portfolio-entry.service";

@Module({
    imports: [TypeOrmModule.forFeature([FileLinkDomain, PortfolioEntryDomain]), UserModule],
    controllers: [FileLinkController],
    providers: [FileLinkService, PortfolioEntryService],
    exports: [TypeOrmModule, FileLinkService],
})
export class FileLinkModule {

}