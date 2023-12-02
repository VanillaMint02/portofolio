import { MigrationInterface, QueryRunner } from "typeorm"
import * as process from "process";

export class CreateTestSchema1701510232478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const doesTestSchemaExist=await queryRunner.hasSchema(process.env.DATABASE_SCHEMA_TEST);
        if (!doesTestSchemaExist){
            await queryRunner.query(`CREATE SCHEMA  ${process.env.DATABASE_SCHEMA_TEST}`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const doesTestSchemaExist=await queryRunner.hasSchema(process.env.DATABASE_SCHEMA_TEST);
        if (doesTestSchemaExist){
            await queryRunner.query(`DROP SCHEMA ${process.env.DATABASE_SCHEMA_TEST}`);
        }
    }

}
