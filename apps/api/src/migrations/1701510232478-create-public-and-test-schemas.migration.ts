import {MigrationInterface, QueryRunner} from "typeorm"
import * as process from "process";
import {CreateSchemaService} from "./service/create-schema.service";

export class CreatePublicAndTestSchemasMigration1701510232478 implements MigrationInterface {
    private testSchemaName = process.env.DATABASE_SCHEMA_TEST;
    private publicSchemaName=process.env.DATABASE_SCHEMA_PUBLIC;
    public async up(queryRunner: QueryRunner): Promise<void> {
        await CreateSchemaService.createSchemaWithSchemaName(this.publicSchemaName,queryRunner);
        await CreateSchemaService.createSchemaWithSchemaName(this.testSchemaName,queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await CreateSchemaService.dropTablesWithSchemaName(this.publicSchemaName,queryRunner);
        await CreateSchemaService.dropTablesWithSchemaName(this.testSchemaName,queryRunner);
    }

}
