import { MigrationInterface, QueryRunner } from 'typeorm';
import * as process from 'process';
import { PopulateSchemaUtils } from './utils/populate-schema.utils';

export class PopulatePublicAndTestTables1701510254816
  implements MigrationInterface
{
  private testSchemaName = process.env.DATABASE_SCHEMA_TEST;
  private publicSchemaName = process.env.DATABASE_SCHEMA_PUBLIC;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await PopulateSchemaUtils.populateUser(
      this.testSchemaName,
      queryRunner,
      '9da8401b-7c1a-496d-b899-e7fbe2412f01',
      'RealKenshinHimura',
      'RealKenshinHimura@gmail.com',
      '$2a$12$xdik.qNIw1/UR97QCuqBT.2Gyti7YVe0Jxb2wcIR.RvFGfTLH9pCq',
    );
    await PopulateSchemaUtils.populatePortfolioEntry(
      this.testSchemaName,
      queryRunner,
      '2c4c5a70-fb36-422d-b105-22b80a0e1be7',
      'Katanarium',
      'An aquarium for Katanas',
      'www.someCustomerLink.com',
      'PUBLISHED',
      '9da8401b-7c1a-496d-b899-e7fbe2412f01',
    );
    await PopulateSchemaUtils.populateFileLink(
      this.testSchemaName,
      queryRunner,
      '../assets/nemessis.png',
      'nemessis.png',
      null,
      '2c4c5a70-fb36-422d-b105-22b80a0e1be7',
    );
    await PopulateSchemaUtils.populateFileLink(
      this.testSchemaName,
      queryRunner,
      '../assets/vulkan.png',
      'vulkan.png',
      '2c4c5a70-fb36-422d-b105-22b80a0e1be7',
      null,
    );
    await PopulateSchemaUtils.populateUser(
      this.publicSchemaName,
      queryRunner,
      'f6264f0b-dbf2-46b1-b9dc-c513a71e57ef',
      'Vlad',
      'vladm1989@yahoo.com',
      '$2a$12$3thJHVBZD.0zg6B6ClHqhO5da45emWXAk0/ICmMNr72folMvEeFiq',
    );
    await PopulateSchemaUtils.populatePortfolioEntry(
      this.publicSchemaName,
      queryRunner,
      'f561b147-bc5d-44f1-9318-831d1150ad12',
      'BarApi',
      'A fullstack application made with ASP.NET and Next.js used for managing a bar',
      'https://github.com/VanillaMint02/BarAPI',
      'PUBLISHED',
      'f6264f0b-dbf2-46b1-b9dc-c513a71e57ef',
    );
    await PopulateSchemaUtils.populateFileLink(
      this.publicSchemaName,
      queryRunner,
      '../assets/bar.png',
      'bar.png',
      null,
      'f561b147-bc5d-44f1-9318-831d1150ad12',
    );
    await PopulateSchemaUtils.populateFileLink(
      this.publicSchemaName,
      queryRunner,
      '../assets/cup.png',
      'cup.png',
      'f561b147-bc5d-44f1-9318-831d1150ad12',
      null,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
