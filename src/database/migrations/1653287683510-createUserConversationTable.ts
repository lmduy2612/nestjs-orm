import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserConversationTable1653287683510
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_conversation',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'users_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'conversation_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_conversation');
  }
}
