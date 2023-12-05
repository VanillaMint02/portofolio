import { QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSchemaUtils {
  public static async createSchemaWithSchemaName(
    schemaName: string,
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createSchema(schemaName, true);
    await queryRunner.createTable(
      new Table({
        name: `${schemaName}.user_domain`,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['ADMIN'],
            enumName: 'user_role_enum',
            isNullable: false,
            default: `'ADMIN'`,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: `${schemaName}.portfolio_entry_domain`,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customerLink',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PUBLISHED', 'HIDDEN'],
            enumName: 'portfolio_entry_status',
            isNullable: false,
            default: `'PUBLISHED'`,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    const userIdForeignKey = new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: `${schemaName}.user_domain`,
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey(
      `${schemaName}.portfolio_entry_domain`,
      userIdForeignKey,
    );
    await queryRunner.createTable(
      new Table({
        name: `${schemaName}.file_link_domain`,
        columns: [
          {
            name: 'objectKey',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'filename',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'portfolioId',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'parentId',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );
    const portfolioIdForeignKey = new TableForeignKey({
      columnNames: ['portfolioId'],
      referencedColumnNames: ['id'],
      referencedTableName: `${schemaName}.portfolio_entry_domain`,
      onDelete: 'CASCADE',
    });
    const parentIdForeignKey = new TableForeignKey({
      columnNames: ['parentId'],
      referencedColumnNames: ['id'],
      referencedTableName: `${schemaName}.portfolio_entry_domain`,
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey(
      `${schemaName}.file_link_domain`,
      portfolioIdForeignKey,
    );
    await queryRunner.createForeignKey(
      `${schemaName}.file_link_domain`,
      parentIdForeignKey,
    );
  }

  public static async dropTablesWithSchemaName(
    schemaName: string,
    queryRunner: QueryRunner,
  ) {
    await queryRunner.dropTable(`${schemaName}.file_link_domain`);
    await queryRunner.dropTable(`${schemaName}.portfolio_entry_domain`);
    await queryRunner.dropTable(`${schemaName}.user_domain`);
  }
}
