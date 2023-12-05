import { MigrationInterface, QueryRunner } from 'typeorm';
import * as process from 'process';
import { CreateSchemaUtils } from './utils/create-schema.utils';

export class CreatePublicAndTestSchemasMigration1701510232478
  implements MigrationInterface
{
  private testSchemaName = process.env.DATABASE_SCHEMA_TEST;
  private publicSchemaName = process.env.DATABASE_SCHEMA_PUBLIC;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await CreateSchemaUtils.createSchemaWithSchemaName(
      this.publicSchemaName,
      queryRunner,
    );
    await CreateSchemaUtils.createSchemaWithSchemaName(
      this.testSchemaName,
      queryRunner,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await CreateSchemaUtils.dropTablesWithSchemaName(
      this.publicSchemaName,
      queryRunner,
    );
    await CreateSchemaUtils.dropTablesWithSchemaName(
      this.testSchemaName,
      queryRunner,
    );
  }
}
